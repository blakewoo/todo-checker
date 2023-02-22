const comment_data = require("/model/comment")

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