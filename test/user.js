const userModule = require('../module/m_user');
const assert = require('assert');
const mariadb = require("../connectors/mariadb")

describe('USER CRUD TEST',  function () {
    const userTestInputData = [['testman1','xptmxm123!','testman1@test.com'],['testman2','xptmxm123!','testman2@test.com'],['testman3','xptmxm123!','testman3@test.com']]
    const userTestAddResultData = [true,true,true]


    const userTestUpdateInputData = [['',''],['',''],['','']]
    const userTestUpdateResultData = [true,true,true]
    const userTestDeleteResultData = [true,true,true]

    let count = 0;
    let dataLength = userTestInputData.length

    before(function (){
        mariadb.getConnection()
            .then(result =>{ console.log("[SYSTEM] Maria DB connected")})
            .catch(error =>{ console.log(error); console.log("[SYSTEM] Maria DB not connected")})
    })

    for(;count<dataLength;count++) {
        describe((count+1)+'번째 테스트 케이스',function () {
            it('CREATE USER',async function (done) {
                let temp = await userModule.addUser(userTestInputData[count][0],userTestInputData[count][1],userTestInputData[count][2])
                assert.equal(temp.status, userTestAddResultData[count]);
                done()
            });
            it('READ USER',async function (done) {
                let temp = await userModule.getUser(userTestInputData[count][0])
                assert.equal(temp.toString(), {ID:userTestInputData[count][0],PASSWORD:userTestInputData[count][1],EMAIL:userTestInputData[count][2]}.toString());
                done()
            });
            it('UPDATE USER',async function (done) {
                let temp = await userModule.updateUser(userTestInputData[count][0],userTestUpdateInputData[count][0],userTestUpdateInputData[count][1])
                assert.equal(temp.status, userTestUpdateResultData[count]);
                done()
            });
            it('DELETE USER',async function (done) {
                let temp = await userModule.deleteUser(userTestInputData[count][0])
                assert.equal(temp.status, userTestDeleteResultData[count]);
                done()
            });
        })
    }

});