const userModule = require('../module/m_user');
const assert = require('assert');

describe('USER CRUD TEST', function () {
    const userTestInputData = []
    const userTestAddResultData = []
    const userTestReadResultData = []

    const userTestUpdateInputData = []
    const userTestUpdateResultData = []
    const userTestDeleteResultData = []

    let count = 0;

    beforeEach(function () {
        assert.equal(userModule.addUser(userTestInputData[count][0],userTestInputData[count][0],userTestInputData[count][0]), userTestAddResultData[count]);
    });
    afterEach(function () {
        assert.equal(userModule.deleteUser(userTestInputData[count][0]), userTestDeleteResultData[count]);
        count += 1
    });
    it('READ USER', function () {
        assert.equal(userModule.getUser(userTestInputData[count][0]), userTestReadResultData[count]);
    });
    it('UPDATE USER', function () {
        assert.equal(userModule.updateUser(userTestInputData[count][0],userTestUpdateInputData[count][0],userTestUpdateInputData[count][1]).status, userTestUpdateResultData[count]);
    });
});