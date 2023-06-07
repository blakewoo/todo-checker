const mongooseConnect = require("../../connectors/mongodb")
const todoShare = require("../../module/m_todo_share")

beforeAll(() => {
    mongooseConnect();
});

describe("TODO SHARE TEST",()=>{
    let todoShareData = [{REQUEST_ID:"chat_req_id",RESPONSE_ID:"chat_res_id"}]

    todoShareData.forEach(function (value,count) {
        test("add request",async ()=>{
            let temp = await todoShare.addRequest(value.REQUEST_ID,value.RESPONSE_ID)
            expect(temp).toBe(true)
        })

        test("get request", async ()=>{
            let temp = await todoShare.getRequest(value.RESPONSE_ID)
            expect(temp[0].OVERSEER_USER_ID).toBe(value.REQUEST_ID)
        })
    })
})