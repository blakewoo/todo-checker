const {MongoMemoryServer} = require('mongodb-memory-server')
const mongoose = require("mongoose")
let mongoMocking;
let mariaMocking;

beforeAll(async () => {
    // maria DB mocking require
});

/**
 *  총 5개의 테스트 케이스
 *  1. CRUD 성공 대상 테스트 케이스
 *  2. C 실패
 *  3. R 실패
 *  4. U 실패
 *  5. D 실패
 */
describe.skip('USER CRUD TEST',  function () {
    const userModuleOrigin = require('../../module/m_user');

    let userModule = userModuleOrigin(mariaMocking,mongoMocking)

    const userTestInputData = [['testman1','xptmm123!','testman1test.com'],['testman2','xptmxm23!','testman2@test.com'],['testman3','xptmxm12!','testman3@test.com']]
    const userTestAddResultData = [true,true,true]

    const userTestUpdateInputData = [['22','33'],['123@haa',''],['','aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa']]
    const userTestUpdateResultData = [true,true,true]
    const userTestDeleteResultData = [true,true,true]

    userTestInputData.forEach(function (value,count){
        describe((count+1)+'번째 테스트 케이스',function () {
            test('CREATE USER',async function () {
                let temp = await userModule.addUser(userTestInputData[count][0],userTestInputData[count][1],userTestInputData[count][2])
                expect(temp.status).toBe(userTestAddResultData[count]);
                if(count ===0) {
                    temp = await userModule.addUser(userTestInputData[count][0],userTestInputData[count][1],userTestInputData[count][2])
                    expect(temp.reason).toBe("ID_duplicated");

                    temp = await userModule.addUser("0",userTestInputData[count][1],userTestInputData[count][2])
                    expect(temp.reason).toBe("EMAIL_duplicated");

                    temp = await userModule.addUser("0","testtest","testtest33@naver.com")
                    expect(temp.status).toBe(true);
                }
            });

            test('VERIFY USER',async function () {
                if(count === 0) {
                    let temp = await userModule.verifyUser("0","0")
                    expect(temp.reason).toBe("ID or Password");
                }
                else if(count === 1) {
                    let temp = await userModule.verifyUser(userTestInputData[count][0],userTestInputData[count][1])
                    expect(temp.status).toBe(true);
                }
                else {
                    let temp = await userModule.verifyUser(userTestInputData[count][0],userTestInputData[count][2])
                    expect(temp.status).toBe(false);
                }
            });

            test('VERIFY EMAIL',async function () {
                if(count === 0) {
                    let temp = await userModule.verifyEmail(userTestInputData[count][2])
                    expect(temp).toBe(true);
                }
                else {
                    let temp = await userModule.verifyEmail(userTestInputData[count][2])
                    expect(temp).toBe(false);
                }
            });

            test('READ USER',async function () {
                let temp = await userModule.getUser(userTestInputData[count][0])
                expect(temp.toString()).toBe({ID:userTestInputData[count][0],PASSWORD:userTestInputData[count][1],EMAIL:userTestInputData[count][2]}.toString());

            });
            test('UPDATE USER',async function () {
                if(count === 0) {
                    let temp = await userModule.updateUser(userTestInputData[count][0],"testtest","testtest33@naver.com")
                    expect(temp.reason).toBe("EMAIL_duplicated");
                }

                let temp = await userModule.updateUser(userTestInputData[count][0],userTestUpdateInputData[count][0],userTestUpdateInputData[count][1])
                expect(temp.status).toBe(userTestUpdateResultData[count]);

            });
            test('DELETE USER',async function () {
                if(count ===0) {
                    let temp = await userModule.deleteUser(0)
                    expect(temp.status).toBe(true);
                }
                let temp = await userModule.deleteUser(userTestInputData[count][0])
                expect(temp.status).toBe(userTestDeleteResultData[count]);
            });
        })
    })

});
