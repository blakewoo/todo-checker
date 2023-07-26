const request = require("supertest")
const makeApp = require("../../app")
let getUserFromId = jest.fn()
let getUserFromEmail = jest.fn()
let getUserFromEmailAndID = jest.fn()
let updateUserEmailAndPasswordFromId = jest.fn()
let updateUserPasswordFromId = jest.fn()
let updateUserEmailFromId = jest.fn()
let deleteUserFromId = jest.fn()

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
        deleteMany:deleteMany
    }

}
const app = makeApp(mariaDB,mongoDB)

describe("Test case when not authorized",()=>{
    //CRUD user test
    test("GET /user/my", async () => {
        let response = await request(app).get("/user/my")
        expect(response.status).toBe(401)
    })

    // Add user function is not require auth

    test("PUT /user/my",async () => {
        let response = await request(app).put("/user/my")
        expect(response.status).toBe(401)
    })

    test("DELETE /user/my",async () => {
        let response = await request(app).delete("/user/my")
        expect(response.status).toBe(401)
    })
})


describe("Test case when authorized",()=>{
    //CRUD user test
    test("GET /user/my", async () => {

    })

    test("POST /user/my : malformed email",async () => {
        let response = await request(app).post("/user/my").send({ID:"",PASSWORD:"",EMAIL:""})
        expect(response.status).toBe(400)
    })

    test("PUT /user/my", () => {

    })

    test("DELETE /user/my", () => {

    })
})