const request = require("supertest")
const makeApp = require("../../app")
let getUserFromId = jest.fn()


let mariaDB = {
    user:{
        getUserFromId:getUserFromId
    }
}
let mongoDB = {}
const app = makeApp(mariaDB,mongoDB)

beforeAll(()=>{
    getUserFromId.mockResolvedValue([{ID:"testman",PASSWORD:"dfdfdf",EMAIL:"dfdfdfdfd@naver.com"}])
})

describe("Test case when not authorized",()=>{
    //CRUD user test
    test("GET /user/my", async () => {
        let response = await request(app).get("/user/my")
        expect(response.status).toBe(401)
    })

    test("POST /user/my", () => {

    })

    test("PUT /user/my", () => {

    })

    test("DELETE /user/my", () => {

    })
})


describe("Test case when authorized",()=>{
    //CRUD user test
    test("GET /user/my", async () => {

    })

    test("POST /user/my", () => {

    })

    test("PUT /user/my", () => {

    })

    test("DELETE /user/my", () => {

    })
})