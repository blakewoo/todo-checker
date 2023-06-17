const mongooseConnect = require("../../connectors/mongodb")
const todoShare = require("../../module/m_todo_share")

beforeAll(() => {
    mongooseConnect();
});

describe("TODO SHARE TEST",()=>{
    let todoShareData = [{REQUEST_ID:"chat_req_id",RESPONSE_ID:"chat_res_id"}]

    for(let i=0;i<todoShareData.length;i++){
        let objId=undefined
        test("add request",async ()=>{
            let temp = await todoShare.addRequest(todoShareData[i].REQUEST_ID,todoShareData[i].RESPONSE_ID)
            expect(temp.status).toBe(true)
            objId = temp.result._id
        })

        test("get request", async ()=>{
            let temp = await todoShare.getRequest(todoShareData[i].RESPONSE_ID)
            expect(temp[0].OVERSEER_USER_ID).toBe(todoShareData[i].REQUEST_ID)
        })

        test("get receive", async ()=>{
            let temp = await todoShare.getReceive(todoShareData[i].RESPONSE_ID)
            expect(temp[0].OVERSEER_USER_ID).toBe(todoShareData[i].REQUEST_ID)
        })

        test("update receive", async ()=>{
            let temp = await todoShare.updateReceive(todoShareData[i].REQUEST_ID,todoShareData[i].RESPONSE_ID,"ACCEPT")
            expect(temp[0].status).toBe(true)
        })

        test("get share list", async ()=>{
            let temp = await todoShare.getChatList(todoShareData[i].RESPONSE_ID)
            expect(temp[0].OVERSEER_USER_ID).toBe(todoShareData[i].REQUEST_ID)
        })

        test("get accept request", async ()=>{
            let temp = await todoShare.getAcceptRequest(todoShareData[i].RESPONSE_ID)
            expect(temp[0].OVERSEER_USER_ID).toBe(todoShareData[i].REQUEST_ID)
        })

        test("delete request", async ()=>{
            let temp = await todoShare.deleteRequest(todoShareData[i].RESPONSE_ID)
            expect(temp.status).toBe(true)
        })
    }
})