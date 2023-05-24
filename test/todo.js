const mongooseConnect = require("../connectors/mongodb")
const mongoose = require("mongoose")
const assert = require('assert');
const todoModule = require("./../module/m_todo")

/**
 *
 */
describe('TODO CRUD TEST',  function () {
    let todoTestInputData = [["testman",new Date(),new Date(),"1","DAILY"],["testman",new Date(),new Date(),"1","DAILY"],["testman",new Date(),new Date(),"1","DAILY"],["testman",new Date(),new Date(),"1","DAILY"],["testman",new Date(),new Date(),"1","DAILY"]]
    let todoTestResultData1 = []
    let todoTestResultData2 = []
    let todoTestResultData3 = []
    let todoTestResultData4 = []
    let todoTestResultData5 = []

    before(function (done){
        mongooseConnect();
    })

    todoTestInputData.forEach(function (value,count){
        describe((count+1)+'번째 테스트 케이스',function () {
            it('CREATE daily to-do',async function () {
                let result = await todoModule.addTodo(todoTestInputData[count][0],todoTestInputData[count][1],todoTestInputData[count][2],todoTestInputData[count][3],todoTestInputData[count][4])
                console.log(result)
            });
            it('READ daily to-do',async function () {
                // await todoModule.getDailyTodo()
            });

            it('READ weekly to-do',async function () {
                // await todoModule.getWeeklyTodo()
            });

            it('READ monthly to-do',async function () {
                // await todoModule.getMontlyTodo()
            });

            it('READ daily notification to-do',async function () {
                // await todoModule.getDailyNotificationTodo()
            });

            it('READ monthly notification to-do',async function () {
                // await todoModule.getMonthlyNotificationTodo()
            });

            it('UPDATE TODO',async function () {
                // await todoModule.updateTodo()
            });

            it('DELETE TODO',async function () {
                // await todoModule.deleteTodo()
            });
        })
    })
})