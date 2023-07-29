const request = require("supertest")
const makeApp = require("../../app")
let session = require('supertest-session');

let getUserFromId = jest.fn()
let getUserFromEmail = jest.fn()
let getUserFromEmailAndID = jest.fn()
let updateUserEmailAndPasswordFromId = jest.fn()
let updateUserPasswordFromId = jest.fn()
let updateUserEmailFromId = jest.fn()
let deleteUserFromId = jest.fn()

let find = jest.fn()
let updateOne = jest.fn()
let updateMany = jest.fn()
let deleteOne = jest.fn()
let deleteMany = jest.fn()

let mariaDB = {
    user:{
        getUserFromId:getUserFromId,
        getUserFromEmail:getUserFromEmail,
        getUserFromEmailAndID:getUserFromEmailAndID,
        updateUserEmailAndPasswordFromId:updateUserEmailAndPasswordFromId,
        updateUserPasswordFromId:updateUserPasswordFromId,
        updateUserEmailFromId:updateUserEmailFromId,
        deleteUserFromId:deleteUserFromId
    }
}
let mongoDB = {
    todo:{
        find:find,
        updateOne:updateOne,
        updateMany:updateMany,
        deleteMany:updateMany,
        deleteOne:deleteOne
    }

}
const app = makeApp(mariaDB,mongoDB)
const sessionApp = session(makeApp(mariaDB,mongoDB))
let authenticatedSession = null

describe("Test case when not authorized",()=>{

    //CRUD user test
    test("GET /my/daily", async () => {
        let response = await request(app).get("/todolist/my/daily")
        expect(response.status).toBe(401)
    })

    test("POST /my/daily", async () => {
        let response = await request(app).post("/todolist/my/daily")
        expect(response.status).toBe(401)
    })

    test("PUT /my/daily",async () => {
        let response = await request(app).put("/todolist/my/daily")
        expect(response.status).toBe(401)
    })

    test("DELETE /my/daily",async () => {
        let response = await request(app).delete("/todolist/my/daily")
        expect(response.status).toBe(401)
    })

    test("GET /my/notification/daily",async () => {
        let response = await request(app).get("/todolist/my/notification/daily")
        expect(response.status).toBe(401)
    })

    test("GET /my/notification/monthly",async () => {
        let response = await request(app).get("/todolist/my/notification/monthly")
        expect(response.status).toBe(401)
    })

    test("POST /my/notification",async () => {
        let response = await request(app).post("/todolist/my/notification")
        expect(response.status).toBe(401)
    })

    test("PUT /my/notification",async () => {
        let response = await request(app).put("/todolist/my/notification")
        expect(response.status).toBe(401)
    })

    test("DELETE /my/notification",async () => {
        let response = await request(app).delete("/todolist/my/notification")
        expect(response.status).toBe(401)
    })

    test("GET /my/weekly",async () => {
        let response = await request(app).get("/todolist/my/weekly")
        expect(response.status).toBe(401)
    })

    test("POST /my/weekly",async () => {
        let response = await request(app).post("/todolist/my/weekly")
        expect(response.status).toBe(401)
    })

    test("PUT /my/weekly",async () => {
        let response = await request(app).put("/todolist/my/weekly")
        expect(response.status).toBe(401)
    })

    test("DELETE /my/weekly",async () => {
        let response = await request(app).delete("/todolist/my/weekly")
        expect(response.status).toBe(401)
    })

    test("GET /my/monthly",async () => {
        let response = await request(app).get("/todolist/my/monthly")
        expect(response.status).toBe(401)
    })

    test("POST /my/monthly",async () => {
        let response = await request(app).post("/todolist/my/monthly")
        expect(response.status).toBe(401)
    })

    test("PUT /my/monthly",async () => {
        let response = await request(app).put("/todolist/my/monthly")
        expect(response.status).toBe(401)
    })

    test("DELETE /my/monthly",async () => {
        let response = await request(app).delete("/todolist/my/monthly")
        expect(response.status).toBe(401)
    })

    test("GET /target/daily",async () => {
        let response = await request(app).get("/todolist/target/daily")
        expect(response.status).toBe(401)
    })

    test("GET /target/notification/daily",async () => {
        let response = await request(app).get("/todolist/target/notification/daily")
        expect(response.status).toBe(401)
    })

    test("GET /target/notification/monthly",async () => {
        let response = await request(app).get("/todolist/target/notification/monthly")
        expect(response.status).toBe(401)
    })

    test("GET /target/weekly",async () => {
        let response = await request(app).get("/todolist/target/weekly")
        expect(response.status).toBe(401)
    })

    test("GET /target/monthly",async () => {
        let response = await request(app).get("/todolist/target/monthly")
        expect(response.status).toBe(401)
    })
})

describe.skip("Test case when authorized",()=>{
    beforeEach((done) =>{
        getUserFromId.mockResolvedValue([{ID:"123123123",PASSWORD:"$2b$10$tb0sRFClT6x30JEhTM4lHeBw0lZFHcWBglzFEpbiMtbyFEJpI7NLe",EMAIL:""}])

        sessionApp.post('/login/verified-user')
            .send({ ID: '123123123', PASSWORD: 'cjswogns12!@' })
            .expect(200)
            .end(function (err) {
                if (err) return done(err);
                authenticatedSession = sessionApp;
                return done()
            });
    })
    //CRUD user test
    test("GET /my/daily", async () => {
        let response = await authenticatedSession.get("/my/daily")
        expect(response.status).toBe(401)
    })

    test("POST /my/daily", async () => {
        let response = await authenticatedSession.post("/my/daily")
        expect(response.status).toBe(401)
    })

    test("PUT /my/daily",async () => {
        let response = await authenticatedSession.put("/my/daily")
        expect(response.status).toBe(401)
    })

    test("DELETE /my/daily",async () => {
        let response = await authenticatedSession.delete("/my/daily")
        expect(response.status).toBe(401)
    })

    test("GET /my/notification/daily",async () => {
        let response = await authenticatedSession.get("/my/notification/daily")
        expect(response.status).toBe(401)
    })

    test("GET /my/notification/monthly",async () => {
        let response = await authenticatedSession.get("/my/notification/monthly")
        expect(response.status).toBe(401)
    })

    test("POST /my/notification",async () => {
        let response = await authenticatedSession.post("/my/notification")
        expect(response.status).toBe(401)
    })

    test("PUT /my/notification",async () => {
        let response = await authenticatedSession.put("/my/notification")
        expect(response.status).toBe(401)
    })

    test("DELETE /my/notification",async () => {
        let response = await authenticatedSession.delete("/my/notification")
        expect(response.status).toBe(401)
    })

    test("GET /my/weekly",async () => {
        let response = await authenticatedSession.get("/my/weekly")
        expect(response.status).toBe(401)
    })

    test("POST /my/weekly",async () => {
        let response = await authenticatedSession.post("/my/weekly")
        expect(response.status).toBe(401)
    })

    test("PUT /my/weekly",async () => {
        let response = await authenticatedSession.put("/my/weekly")
        expect(response.status).toBe(401)
    })

    test("DELETE /my/weekly",async () => {
        let response = await authenticatedSession.delete("/my/weekly")
        expect(response.status).toBe(401)
    })

    test("GET /my/monthly",async () => {
        let response = await authenticatedSession.get("/my/monthly")
        expect(response.status).toBe(401)
    })

    test("POST /my/monthly",async () => {
        let response = await authenticatedSession.post("/my/monthly")
        expect(response.status).toBe(401)
    })

    test("PUT /my/monthly",async () => {
        let response = await authenticatedSession.put("/my/monthly")
        expect(response.status).toBe(401)
    })

    test("DELETE /my/monthly",async () => {
        let response = await authenticatedSession.delete("/my/monthly")
        expect(response.status).toBe(401)
    })

    test("GET /target/daily",async () => {
        let response = await authenticatedSession.get("/target/daily")
        expect(response.status).toBe(401)
    })

    test("GET /target/notification/daily",async () => {
        let response = await authenticatedSession.get("/target/notification/daily")
        expect(response.status).toBe(401)
    })

    test("GET /target/notification/monthly",async () => {
        let response = await authenticatedSession.get("/target/notification/monthly")
        expect(response.status).toBe(401)
    })

    test("GET /target/weekly",async () => {
        let response = await authenticatedSession.get("/target/weekly")
        expect(response.status).toBe(401)
    })

    test("GET /target/monthly",async () => {
        let response = await authenticatedSession.get("/target/monthly")
        expect(response.status).toBe(401)
    })
})