const todoShareOrigin = require("../../module/m_todo_share")
let todoShare;

let mongoMocking;
let mariaMocking;

let getUserFromId = jest.fn();
let create = jest.fn();
let find = jest.fn();
let deleteOne = jest.fn();
let updateOne = jest.fn();


beforeAll(async () => {
    getUserFromId.mockReset()
    create.mockReset()
    find.mockReset()
    deleteOne.mockReset()
    updateOne.mockReset()

    // maria DB mocking require
    mariaMocking = {
        user:{
            getUserFromId:getUserFromId
        }
    }

    // mongo DB mocking require
    mongoMocking ={
        shared:{
            create:create,
            find:find,
            deleteOne:deleteOne,
            updateOne:updateOne
        }
    }
    todoShare = todoShareOrigin(mariaMocking,mongoMocking)
});

describe("TODO SHARE TEST",()=>{
    let todoShareData = [{REQUEST_ID:"chat_req_id",RESPONSE_ID:"chat_res_id"}]

    for(let i=0;i<todoShareData.length;i++){
        beforeEach(()=>{
            getUserFromId.mockResolvedValue([{ID:"123123123",PASSWORD:"DFDFDFDF",EMAIL:"abc@naver.com"}])
            deleteOne.mockResolvedValue(true)
            updateOne.mockResolvedValue(true)
            find.mockResolvedValue([{
                OVERSEER_USER_ID: "chat_req_id",
                OVERSEER_EMAIL: "abc@naver.com",
                TARGET_USER_ID: "chat_res_id",
                TARGET_EMAIL:"cba@naver.com",
                CREATED_DATE: new Date(),
                STATUS:"ACCEPT"
            }])
        })

        let objId = undefined
        test("add request",async ()=>{
            getUserFromId.mockImplementation(ID=> new Promise((resolve,reject)=>{
                if(ID==="chat_req_id") {
                    resolve([{ID:"chat_req_id",PASSWORD:"DFDFDFDF",EMAIL:"abc@naver.com"}])
                }
                else {
                    resolve([{ID:"chat_res_id",PASSWORD:"DFDFDFDF",EMAIL:"abc@naver.com"}])
                }
            }))
            create.mockResolvedValue([{ID:"123123123",PASSWORD:"DFDFDFDF",EMAIL:"abc@naver.com"}])
            let temp = await todoShare.addRequest(todoShareData[i].REQUEST_ID,todoShareData[i].RESPONSE_ID)
            expect(temp.status).toBe(true)
            objId = temp.result._id
        })

        test("get request", async ()=>{
            let temp = await todoShare.getRequest(todoShareData[i].RESPONSE_ID)
            expect(temp.result[0].OVERSEER_USER_ID).toBe(todoShareData[i].REQUEST_ID)
        })

        test("get receive", async ()=>{
            let temp = await todoShare.getReceive(todoShareData[i].RESPONSE_ID)
            expect(temp.result[0].OVERSEER_USER_ID).toBe(todoShareData[i].REQUEST_ID)
        })

        test("update receive", async ()=>{
            let temp = await todoShare.updateReceive(todoShareData[i].REQUEST_ID,todoShareData[i].RESPONSE_ID,"ACCEPT")
            expect(temp.status).toBe(true)
        })

        test("get share list", async ()=>{
            let temp = await todoShare.getChatList(todoShareData[i].RESPONSE_ID)
            expect(temp.result[0].OVERSEER_USER_ID).toBe(todoShareData[i].REQUEST_ID)
        })

        test("get accept request", async ()=>{
            let temp = await todoShare.getAcceptRequest(todoShareData[i].RESPONSE_ID)
            expect(temp.result[0].OVERSEER_USER_ID).toBe(todoShareData[i].REQUEST_ID)
        })

        test("delete request", async ()=>{
            let temp = await todoShare.deleteRequest(objId)
            expect(temp.status).toBe(true)
        })
    }
})