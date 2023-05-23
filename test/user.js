const userModule = require('../module/m_user');
const assert = require('assert');
const mariadb = require("../connectors/mariadb")
const mongooseConnect = require("../connectors/mongodb")
const mongoose = require("mongoose")

/**
 *  총 5개의 테스트 케이스
 *  1. CRUD 성공 대상 테스트 케이스
 *  2. C 실패
 *  3. R 실패
 *  4. U 실패
 *  5. D 실패
 */
describe('USER CRUD TEST',  function () {
    const userTestInputData = [['testman1','xptmxm123!','testman1@test.com'],['testman2','xptmxm123!','testman2@test.com'],['testman3','xptmxm123!','testman3@test.com']]
    const userTestAddResultData = [true,true,true]

    const userTestUpdateInputData = [['',''],['',''],['','']]
    const userTestUpdateResultData = [true,true,true]
    const userTestDeleteResultData = [true,true,true]

    before(function (done){
        mariadb.getConnection()
            .then(result =>{ console.log("[SYSTEM] Maria DB connected"); done()})
            .catch(error =>{ console.log(error); console.log("[SYSTEM] Maria DB not connected"); done()})
    })

    userTestInputData.forEach(function (value,count){
        describe((count+1)+'번째 테스트 케이스',function () {
            it('CREATE USER',async function () {
                let temp = await userModule.addUser(userTestInputData[count][0],userTestInputData[count][1],userTestInputData[count][2])
                assert.strictEqual(temp.status, userTestAddResultData[count]);

            });
            it('READ USER',async function () {
                let temp = await userModule.getUser(userTestInputData[count][0])
                assert.strictEqual(temp.toString(), {ID:userTestInputData[count][0],PASSWORD:userTestInputData[count][1],EMAIL:userTestInputData[count][2]}.toString());

            });
            it('UPDATE USER',async function () {
                let temp = await userModule.updateUser(userTestInputData[count][0],userTestUpdateInputData[count][0],userTestUpdateInputData[count][1])
                assert.strictEqual(temp.status, userTestUpdateResultData[count]);

            });
            it('DELETE USER',async function () {
                let temp = await userModule.deleteUser(userTestInputData[count][0])
                assert.strictEqual(temp.status, userTestDeleteResultData[count]);

            });
        })
    })

});

/**
 *  총 5개의 테스트 케이스
 *  1. CRUD 성공 대상 테스트 케이스
 *  2. C 실패
 *  3. R 실패
 *  4. U 실패
 *  5. D 실패
 */
describe('TODO CRUD TEST',  function () {
    let todoTestInputData = []

    before(function (done){
        mongooseConnect();
    })

    todoTestInputData.forEach(function (value,count){
        describe((count+1)+'번째 테스트 케이스',function () {
            it('CREATE USER',async function () {

            });
            it('READ USER',async function () {

            });
            it('UPDATE USER',async function () {

            });
            it('DELETE USER',async function () {

            });
        })
    })
})
