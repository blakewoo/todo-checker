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

let create = jest.fn()
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
        create:create,
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

describe("Test case when authorized",()=>{
    beforeEach((done) =>{
        getUserFromId.mockResolvedValue([{ID:"123123123",PASSWORD:"$2b$10$tb0sRFClT6x30JEhTM4lHeBw0lZFHcWBglzFEpbiMtbyFEJpI7NLe",EMAIL:""}])
        create.mockResolvedValue(true)
        find.mockResolvedValue([{USER_ID: "123123123",
            CREATED_DATE: new Date(),
            TARGET_DATE: new Date(),
            DEAD_LINE:new Date(),
            DATA: "abcd",
            ORDER: 1,
            TYPE: "Daily",
            IS_DONE: true
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
    //CRUD user test
    test("GET /my/daily", async () => {
        let response = await authenticatedSession.get("/todolist/my/daily").query("date=1690803684323")
        expect(response.status).toBe(200)
    })

    test("POST /my/daily", async () => {
        let response = await authenticatedSession.post("/todolist/my/daily").send({CREATED_DATE:new Date(),TARGET_DATE:new Date(),DATA:"체크"})
        expect(response.status).toBe(200)
    })

    test("PUT /my/daily",async () => {
        let response = await authenticatedSession.put("/todolist/my/daily").send({TODO_ID:"abcdef",TODO_DATA:{IS_DONE:false,DEAD_LINE:new Date(),DATA:"DDD"}})
        expect(response.status).toBe(200)
    })

    test("DELETE /my/daily",async () => {
        let response = await authenticatedSession.delete("/todolist/my/daily").send({TODO_ID:"abcdef"})
        expect(response.status).toBe(200)
    })

    test.skip("GET /my/notification/daily",async () => {
        let response = await authenticatedSession.get("/todolist/my/notification/daily")
        expect(response.status).toBe(401)
    })

    test.skip("GET /my/notification/monthly",async () => {
        let response = await authenticatedSession.get("/todolist/my/notification/monthly")
        expect(response.status).toBe(401)
    })

    test.skip("POST /my/notification",async () => {
        let response = await authenticatedSession.post("/todolist/my/notification")
        expect(response.status).toBe(401)
    })

    test.skip("PUT /my/notification",async () => {
        let response = await authenticatedSession.put("/todolist/my/notification")
        expect(response.status).toBe(401)
    })

    test.skip("DELETE /my/notification",async () => {
        let response = await authenticatedSession.delete("/todolist/my/notification")
        expect(response.status).toBe(401)
    })

    test.skip("GET /my/weekly",async () => {
        let response = await authenticatedSession.get("/todolist/my/weekly")
        expect(response.status).toBe(401)
    })

    test.skip("POST /my/weekly",async () => {
        let response = await authenticatedSession.post("/todolist/my/weekly")
        expect(response.status).toBe(401)
    })

    test.skip("PUT /my/weekly",async () => {
        let response = await authenticatedSession.put("/todolist/my/weekly")
        expect(response.status).toBe(401)
    })

    test.skip("DELETE /my/weekly",async () => {
        let response = await authenticatedSession.delete("/todolist/my/weekly")
        expect(response.status).toBe(401)
    })

    test.skip("GET /my/monthly",async () => {
        let response = await authenticatedSession.get("/todolist/my/monthly")
        expect(response.status).toBe(401)
    })

    test.skip("POST /my/monthly",async () => {
        let response = await authenticatedSession.post("/todolist/my/monthly")
        expect(response.status).toBe(401)
    })

    test.skip("PUT /my/monthly",async () => {
        let response = await authenticatedSession.put("/todolist/my/monthly")
        expect(response.status).toBe(401)
    })

    test.skip("DELETE /my/monthly",async () => {
        let response = await authenticatedSession.delete("/todolist/my/monthly")
        expect(response.status).toBe(401)
    })

    test.skip("GET /target/daily",async () => {
        let response = await authenticatedSession.get("/todolist/target/daily")
        expect(response.status).toBe(401)
    })

    test.skip("GET /target/notification/daily",async () => {
        let response = await authenticatedSession.get("/todolist/target/notification/daily")
        expect(response.status).toBe(401)
    })

    test.skip("GET /target/notification/monthly",async () => {
        let response = await authenticatedSession.get("/todolist/target/notification/monthly")
        expect(response.status).toBe(401)
    })

    test.skip("GET /target/weekly",async () => {
        let response = await authenticatedSession.get("/todolist/target/weekly")
        expect(response.status).toBe(401)
    })

    test.skip("GET /target/monthly",async () => {
        let response = await authenticatedSession.get("/todolist/target/monthly")
        expect(response.status).toBe(401)
    })
})