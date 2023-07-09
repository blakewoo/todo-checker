const {MongoMemoryServer} = require('mongodb-memory-server-core')
const mongoose = require("mongoose")
const chattingModuleOrigin = require("../../module/m_chatting")
let mongoMocking;
let mariaMocking;

beforeAll(async () => {
    const mongoServer  = await MongoMemoryServer.create();
    mongoMocking = mongoose.createConnection(mongoServer.getUri(), { dbName: "todo" });
});

describe("CHATTING TEST",()=>{
    let chattingModule = chattingModuleOrigin(mariaMocking,mongoMocking)
    let chattingData = [{REQUEST_ID:"chat_req_id",RESPONSE_ID:"chat_res_id",MESSAGE:"test"}]

    chattingData.forEach(function (value,count) {
        test("add chatting",async ()=>{
            let temp = await chattingModule.addChatting(value.REQUEST_ID,value.RESPONSE_ID,value.MESSAGE)
            expect(temp).toBe(true)
        })

        test("get chatting", async ()=>{
            let temp = await chattingModule.getChatting(value.REQUEST_ID,value.RESPONSE_ID)
            expect(temp[0].MESSAGE).toBe("test")
        })
    })
})

afterAll(async () => {
    // put your client disconnection code here, example with mongodb:
    await mongoMocking.disconnect();
});