const comment_data = require("../model/comment")

/**
 *
 * @param USER_ID
 * @param PARENT
 * @param DATE
 * @param COMMENT_DATA
 * @returns {Promise<boolean>}
 */
exports.addComment = async function (USER_ID,PARENT,DATE,COMMENT_DATA) {
    try{
        await comment_data.create({
            USER_ID: USER_ID,
            TARGET_DATE: DATE,
            PARENT:PARENT,
            DATA: COMMENT_DATA
        })
        return true
    }
    catch(e) {
        console.error(e)
        return false
    }
}

/**
 *
 * @param USER_ID
 * @param DATE
 * @returns {Promise<*|boolean>}
 */
exports.getComment = async function (USER_ID,DATE) {
    try{
        return await comment_data.find({
            USER_ID: USER_ID,
            TARGET_DATE: DATE
        })
    }
    catch(e) {
        console.error(e)
        return false
    }
}

/**
 *
 * @param COMMENT_ID
 * @param COMMENT_DATA
 * @returns {Promise<*|boolean>}
 */
exports.updateComment = async function (COMMENT_ID,COMMENT_DATA) {
    try{
        return await comment_data.find({
            COMMENT_ID: COMMENT_ID
        },{
            DATA : COMMENT_DATA
        })
    }
    catch(e) {
        console.error(e)
        return false
    }
}

/**
 *
 * @param COMMENT_ID
 * @returns {Promise<*|boolean>}
 */
exports.deleteComment = async function (COMMENT_ID) {
    try{
        return await comment_data.deleteOne({
            COMMENT_ID: COMMENT_ID
        })
    }
    catch(e) {
        console.error(e)
        return false
    }
}