const {MongoMemoryServer} = require('mongodb-memory-server')
const mongoose = require("mongoose")
const todoModuleOrigin = require("../../module/m_todo")
let todoModule
let mongoMocking;
let mariaMocking;
let create=jest.fn();
let find=jest.fn();
let updateOne=jest.fn();
let deleteOne=jest.fn();
let deleteMany=jest.fn();

beforeAll(async () => {
    create.mockReset()
    updateOne.mockReset()
    deleteOne.mockReset()
    deleteMany.mockReset()
    create.mockResolvedValue(true)
    updateOne.mockResolvedValue(true)
    deleteOne.mockResolvedValue(true)
    deleteMany.mockResolvedValue(true)

    // mongo DB mocking require
    mongoMocking = {
        todo: {
            create: create,
            find:find,
            updateOne:updateOne,
            deleteOne:deleteOne,
            deleteMany:deleteMany
        }
    }

    todoModule = todoModuleOrigin(mariaMocking,mongoMocking)
});

describe("TODO TEST",()=>{
    let todoTestInputData = [["testman",new Date(),new Date(),"1","DAILY"],["testman1",new Date(),new Date(),"2","WEEKLY"],["testman2",new Date(),new Date(),"3","MONTHLY"],["testman3",new Date(),new Date(),"4","NOTIFICATION"],["testman4",new Date(),new Date(),"5","NOTIFICATION"]]

    todoTestInputData.forEach(function (value,count){
        describe((count+1)+'번째 테스트 케이스',function () {
            beforeEach(()=>{
                find.mockReset()
                find.mockResolvedValue(todoTestInputData[count])
            })

            let currentId = null
            test('CREATE daily to-do',async () => {
                let result = await todoModule.addTodo(todoTestInputData[count][0],todoTestInputData[count][1],todoTestInputData[count][2],todoTestInputData[count][3],todoTestInputData[count][4])
                expect(result.USER_ID).toBe(todoTestInputData[count][0])
                currentId = result._id
            });
            test('READ daily to-do',async () => {
                let result = await todoModule.getDailyTodo(todoTestInputData[count][0],todoTestInputData[count][1])
                if (count === 0)  {
                    expect(result[0].USER_ID).toBe(todoTestInputData[count][0])
                }
                else {
                    expect(result[0]).toBeUndefined()
                }
            });

            test('READ weekly to-do',async () => {
                let result = await todoModule.getWeeklyTodo(todoTestInputData[count][0],todoTestInputData[count][1])
                if (count === 1)  {
                    expect(result[0].USER_ID).toBe(todoTestInputData[count][0])
                }
                else {
                    expect(result[0]).toBeUndefined()
                }
            });

            test('READ monthly to-do',async () => {
                let result = await todoModule.getMontlyTodo(todoTestInputData[count][0],todoTestInputData[count][1])
                if (count === 2)  {
                    expect(result[0].USER_ID).toBe(todoTestInputData[count][0])
                }
                else {
                    expect(result[0]).toBeUndefined()
                }
            });

            test('READ daily notification to-do',async () => {
                let result = await todoModule.getDailyNotificationTodo(todoTestInputData[count][0],todoTestInputData[count][1])
                if (count === 3 || count === 4)  {
                    expect(result[0].USER_ID).toBe(todoTestInputData[count][0])
                }
                else {
                    expect(result[0]).toBeUndefined()
                }
            });

            test('READ monthly notification to-do',async () => {
                let result = await todoModule.getMonthlyNotificationTodo(todoTestInputData[count][0],todoTestInputData[count][1])
                if (count === 3 || count === 4)  {
                    expect(result[0].USER_ID).toBe(todoTestInputData[count][0])
                }
                else {
                    expect(result[0]).toBeUndefined()
                }
            });

            test('UPDATE TODO',async () => {
                let result = await todoModule.updateTodo(currentId,{DEAD_LINE:new Date(),IS_DONE:true,DATA:"test1"})
                expect(result).toBe(true)
            });

            test('DELETE TODO',async () => {
                let result = await todoModule.deleteTodo(currentId)
                expect(result).toBe(true)
            });

            test('DELETE TODOS',async () => {
                let result = await todoModule.deleteUserTodos(currentId)
                expect(result).toBe(true)
            });
        })
    })
})
