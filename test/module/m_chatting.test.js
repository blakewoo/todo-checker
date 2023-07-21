let chattingModuleOrigin = require("../../module/m_chatting")
let chattingModule;
let mongoMocking;
let mariaMocking;
let create = jest.fn()
let find = jest.fn()

beforeAll(async () => {
    // mongo DB mocking require
    create.mockReset()
    find.mockReset()

    mongoMocking = {
        chatting:{
            create:create,
            find:find
        }
    }

    chattingModule = chattingModuleOrigin(mariaMocking,mongoMocking)
});

describe("CHATTING TEST",()=>{
    let chattingData = [{REQUEST_ID:"chat_req_id",RESPONSE_ID:"chat_res_id",MESSAGE:"test"}]

    beforeEach(()=>{
        create.mockResolvedValue(true)
        find.mockResolvedValue([{MESSAGE:"test"}])
    })

    test("add chatting",async ()=>{
        let temp = await chattingModule.addChatting(chattingData[0].REQUEST_ID,chattingData[0].RESPONSE_ID,chattingData[0].MESSAGE)
        expect(temp).toBe(true)
    })

    test("get chatting", async ()=>{
        let temp = await chattingModule.getChatting(chattingData[0].REQUEST_ID,chattingData[0].RESPONSE_ID)
        expect(temp[0].MESSAGE).toBe("test")
    })
})
