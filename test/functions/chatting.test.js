const request = require("supertest")
const makeApp = require("../../app")
let session = require('supertest-session');

let getUserFromId = jest.fn()

let create = jest.fn()
let find = jest.fn()

let mariaDB = {
    user:{
        getUserFromId:getUserFromId
    }
}
let mongoDB = {
    chatting:{
        create:create,
        find:find
    }

}
const app = makeApp(mariaDB,mongoDB)
const sessionApp = session(makeApp(mariaDB,mongoDB))
let authenticatedSession = null

beforeAll((done) =>{
    getUserFromId.mockResolvedValue([{ID:"123123123",PASSWORD:"$2b$10$tb0sRFClT6x30JEhTM4lHeBw0lZFHcWBglzFEpbiMtbyFEJpI7NLe",EMAIL:""}])
    create.mockResolvedValue(true)
    find.mockResolvedValue([{
        REQUEST_ID: "abcdef",
        DESTINATION_ID: "abcdef",
        MESSAGE:"abdd",
        CREATED: new Date()
    }])

    sessionApp.post('/login/verified-user')
        .send({ ID: '123123123', PASSWORD: 'cjswogns12!@' })
        .expect(200)
        .end(function (err) {
            if (err) return done(err);
            authenticatedSession = sessionApp;
            return done()
        });
})
describe("Test case when not authorized",()=>{

    //CRUD user test
    test("GET /chatting/my", async () => {
        let response = await request(app).get("/chatting/my").query("targetId=abcdef")
        expect(response.status).toBe(401)
    })

    test("POST /chatting/my", async () => {
        let response = await request(app).post("/chatting/my").send({targetId:"abcde",message:"체크"})
        expect(response.status).toBe(401)
    })
})

describe("Test case when authorized",()=>{
    //CRUD user test
    test("GET /chatting/my", async () => {
        let response = await authenticatedSession.get("/chatting/my").query("targetId=abcdef")
        expect(response.status).toBe(200)
    })

    test("POST /chatting/my", async () => {
        let response = await authenticatedSession.post("/chatting/my").send({targetId:"abcde",message:"체크"})
        expect(response.status).toBe(200)
    })
})