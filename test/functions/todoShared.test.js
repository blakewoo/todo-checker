const request = require("supertest")
const makeApp = require("../../app")
let session = require('supertest-session');

let getUserFromId = jest.fn()

let create = jest.fn()
let find = jest.fn()
let deleteOne =jest.fn()
let updateOne = jest.fn()

let mariaDB = {
    user:{
        getUserFromId:getUserFromId
    }
}
let mongoDB = {
    shared:{
        create:create,
        find:find,
        deleteOne:deleteOne,
        updateOne:updateOne
    }

}
const app = makeApp(mariaDB,mongoDB)
const sessionApp = session(makeApp(mariaDB,mongoDB))
let authenticatedSession = null

beforeAll((done) =>{
    getUserFromId.mockResolvedValue([{ID:"123123123",PASSWORD:"$2b$10$tb0sRFClT6x30JEhTM4lHeBw0lZFHcWBglzFEpbiMtbyFEJpI7NLe",EMAIL:""}])
    create.mockResolvedValue(true)
    find.mockImplementation((ID)=>{
        if(ID === "123123123") {
            return [{
                REQUEST_ID: "abcdef",
                DESTINATION_ID: "fedcba",
                MESSAGE:"abdd",
                CREATED: new Date()
            }]
        }
        else{
            return [{
                REQUEST_ID: "fedcba",
                DESTINATION_ID: "abcdef",
                MESSAGE:"abdd",
                CREATED: new Date()
            }]
        }
    })
    updateOne.mockResolvedValue(true)
    deleteOne.mockResolvedValue(true)

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
    test("GET /todo-share/request", async () => {
        let response = await request(app).get("/todo-share/request")
        expect(response.status).toBe(401)
    })

    test("GET /todo-share/request/accept", async () => {
        let response = await request(app).get("/todo-share/request/accept")
        expect(response.status).toBe(401)
    })

    test("POST /todo-share/request", async () => {
        let response = await request(app).post("/todo-share/request")
        expect(response.status).toBe(401)
    })

    test("DELETE /todo-share/request", async () => {
        let response = await request(app).delete("/todo-share/request")
        expect(response.status).toBe(401)
    })

    test("GET /todo-share/receive", async () => {
        let response = await request(app).get("/todo-share/receive")
        expect(response.status).toBe(401)
    })

    test("PUT /todo-share/receive", async () => {
        let response = await request(app).put("/todo-share/receive")
        expect(response.status).toBe(401)
    })

    test("GET /todo-share/chatlist", async () => {
        let response = await request(app).get("/todo-share/chatlist")
        expect(response.status).toBe(401)
    })
})

describe("Test case when authorized",()=>{
    test("GET /todo-share/request", async () => {
        let response = await authenticatedSession.get("/todo-share/request")
        expect(response.status).toBe(200)
    })

    test("GET /todo-share/request/accept", async () => {
        let response = await authenticatedSession.get("/todo-share/request/accept")
        expect(response.status).toBe(200)
    })

    test("POST /todo-share/request", async () => {
        let response = await authenticatedSession.post("/todo-share/request").send({target:"abcdef"})
        expect(response.status).toBe(200)
    })

    test("DELETE /todo-share/request", async () => {
        let response = await authenticatedSession.delete("/todo-share/request").send({target:"abcdef"})
        expect(response.status).toBe(200)
    })

    test("GET /todo-share/receive", async () => {
        let response = await authenticatedSession.get("/todo-share/receive")
        expect(response.status).toBe(200)
    })

    test("PUT /todo-share/receive", async () => {
        let response = await authenticatedSession.put("/todo-share/receive").send({requester:"abcdef",state:"ACCEPT"})
        expect(response.status).toBe(200)
    })

    test("GET /todo-share/chatlist", async () => {
        let response = await authenticatedSession.get("/todo-share/chatlist")
        expect(response.status).toBe(200)
    })
})