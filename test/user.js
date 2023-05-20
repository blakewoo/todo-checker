const userModule = require('../module/m_user');
const assert = require('assert');

describe('USER CRUD TEST', function () {
    const userTestInputData = [2,2,2,2,2]
    const userTestAddResultData = []
    const userTestReadResultData = []

    const userTestUpdateInputData = []
    const userTestUpdateResultData = []
    const userTestDeleteResultData = []

    let count = 0;
    let dataLength = userTestInputData.length

    before(async () => {
       // DB connection 변경
    });

    after(async () => {
        // DB connection 변경
    });

    for(;count<dataLength;count++) {
        describe((count+1)+'번째 테스트 케이스', function () {
            it('CREATE USER', function () {
                // assert.equal(userModule.addUser(userTestInputData[count][0],userTestInputData[count][0],userTestInputData[count][0]), userTestAddResultData[count]);
            });
            it('READ USER', function () {
                // assert.equal(userModule.getUser(userTestInputData[count][0]), userTestReadResultData[count]);
            });
            it('UPDATE USER', function () {
                // assert.equal(userModule.updateUser(userTestInputData[count][0],userTestUpdateInputData[count][0],userTestUpdateInputData[count][1]).status, userTestUpdateResultData[count]);
            });
            it('DELETE USER', function () {
                // assert.equal(userModule.deleteUser(userTestInputData[count][0]), userTestDeleteResultData[count]);
            });
        })
    }

});