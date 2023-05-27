const mongooseConnect = require("../connectors/mongodb")
let mongoose = require("mongoose")
const assert = require('assert');
const todoModule = require("./../module/m_todo")

/**
 *
 */
describe('TODO CRUD TEST',  function () {
    let todoTestInputData = [["testman",new Date(),new Date(),"1","DAILY"],["testman1",new Date(),new Date(),"2","WEEKLY"],["testman2",new Date(),new Date(),"3","MONTHLY"],["testman3",new Date(),new Date(),"4","NOTIFICATION"],["testman4",new Date(),new Date(),"5","NOTIFICATION"]]

    before(function (){
        mongooseConnect();
    })

    todoTestInputData.forEach(function (value,count){
        describe((count+1)+'번째 테스트 케이스',function () {
            let currentId = null
            it('CREATE daily to-do',async function () {
                let result = await todoModule.addTodo(todoTestInputData[count][0],todoTestInputData[count][1],todoTestInputData[count][2],todoTestInputData[count][3],todoTestInputData[count][4])
                assert.strictEqual(result.USER_ID,todoTestInputData[count][0])
                currentId = result._id
            });
            it('READ daily to-do',async function () {
                let result = await todoModule.getDailyTodo(todoTestInputData[count][0],todoTestInputData[count][1])
                if (count === 0)  {
                    assert.strictEqual(result[0].USER_ID,todoTestInputData[count][0])
                }
                else {
                    assert.strictEqual(result[0],undefined)
                }
            });

            it('READ weekly to-do',async function () {
                let result = await todoModule.getWeeklyTodo(todoTestInputData[count][0],todoTestInputData[count][1])
                if (count === 1)  {
                    assert.strictEqual(result[0].USER_ID,todoTestInputData[count][0])
                }
                else {
                    assert.strictEqual(result[0],undefined)
                }
            });

            it('READ monthly to-do',async function () {
                let result = await todoModule.getMontlyTodo(todoTestInputData[count][0],todoTestInputData[count][1])
                if (count === 2)  {
                    assert.strictEqual(result[0].USER_ID,todoTestInputData[count][0])
                }
                else {
                    assert.strictEqual(result[0],undefined)
                }
            });

            it('READ daily notification to-do',async function () {
                let result = await todoModule.getDailyNotificationTodo(todoTestInputData[count][0],todoTestInputData[count][1])
                if (count === 3 || count === 4)  {
                    assert.strictEqual(result[0].USER_ID,todoTestInputData[count][0])
                }
                else {
                    assert.strictEqual(result[0],undefined)
                }
            });

            it('READ monthly notification to-do',async function () {
                let result = await todoModule.getMonthlyNotificationTodo(todoTestInputData[count][0],todoTestInputData[count][1])
                if (count === 3 || count === 4)  {
                    assert.strictEqual(result[0].USER_ID,todoTestInputData[count][0])
                }
                else {
                    assert.strictEqual(result[0],undefined)
                }
            });

            it('UPDATE TODO',async function () {
                let result = await todoModule.updateTodo(currentId,"test_value")
                assert.strictEqual(result,true)
            });

            it('DELETE TODO',async function () {
                let result = await todoModule.deleteTodo(currentId)
                assert.strictEqual(result,true)
            });
        })
    })
})