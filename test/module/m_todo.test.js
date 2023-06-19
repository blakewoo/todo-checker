const mongooseConnect = require("../../connectors/mongodb")
const todoModule = require("../../module/m_todo")
const todoModel = require("../../model/md_to-do")
jest.mock("../../model/md_to-do")

beforeAll(() => {
    mongooseConnect();
});

describe("TODO TEST",()=>{
    const find = jest.fn(async (query) => {

    })

    const create = jest.fn(async (query) => {

    })

    const updateOne = jest.fn(async (query,updateObject) => {

    })

    const deleteOne = jest.fn(async (query) => {

    })

    const deleteMany = jest.fn(async (query) => {

    })

    todoModel.mockImplementation(()=>{
        return {
            find,create,updateOne,deleteOne,deleteMany
        }
    })

    let todoTestInputData = [["testman",new Date(),new Date(),"1","DAILY"],["testman1",new Date(),new Date(),"2","WEEKLY"],["testman2",new Date(),new Date(),"3","MONTHLY"],["testman3",new Date(),new Date(),"4","NOTIFICATION"],["testman4",new Date(),new Date(),"5","NOTIFICATION"]]

    todoTestInputData.forEach(function (value,count){
        describe((count+1)+'번째 테스트 케이스',function () {
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
