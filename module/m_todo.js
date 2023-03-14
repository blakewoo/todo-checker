const todo_data = require("../model/to-do")
const time_data = require("../module/m_timezone")


exports.addTodo = async function (USER_ID,DATE,TARGET_DATE,TODO_DATA) {
   try{
       let result = await todo_data.create({
           USER_ID: USER_ID,
           TARGET_DATE:TARGET_DATE,
           CREATED_DATE: DATE,
           DEAD_LINE:null,
           DATA: TODO_DATA,
           isDone: false
       })
       return result
   }
   catch(e) {
       console.error(e)
       return false
   }
}



exports.getTodo = async function (USER_ID,DATE) {
    try{
        // 나라 기준으로 0시0분부터 23시 59분까지의 값을 갖고 와야함
        // let startDate = time_data.getStartTime(DATE)
        // let endDate = time_data.getEndTime(DATE)
        let startDate = new Date(DATE.setHours(0,0,0,0))
        let endDate = new Date(DATE.setHours(24,0,0,0))
        return await todo_data.find({
            USER_ID: USER_ID,
            $or:[{TARGET_DATE: {"$gte":startDate,"$lte":endDate}},{DEAD_LINE: {"$gte":startDate,"$lte":endDate}}]
        })
    }
    catch(e) {
        console.error(e)
        return false
    }
}

exports.getAllTodo = async function (USER_ID,DATE) {

}

exports.updateTodo = async function (TODO_ID,TODO_DATA) {
    try{
        await todo_data.updateOne({
            TODO_ID: TODO_ID,
            DATA: TODO_DATA
        })
        return true
    }
    catch(e) {
        console.error(e)
        return false
    }
}

exports.deleteTodo = async function (TODO_ID) {
    try{
        await todo_data.deleteOne({
            _id: TODO_ID
        })
        return true
    }
    catch(e) {
        console.error(e)
        return false
    }
}

exports.deleteUserTodos = async function (USER_ID) {
    try{
        await todo_data.deleteMany({
            USER_ID: USER_ID
        })
        return true
    }
    catch(e) {
        console.error(e)
        return false
    }
}