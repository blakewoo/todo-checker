const todo_data = require("../model/data")

exports.addTodo = async function (USER_ID,DATE,TODO_DATA) {
   try{
       await todo_data.create({
           USER_ID: USER_ID,
           TARGET_DATE: DATE,
           DATA: TODO_DATA,
           isDone: false
       })
       return true
   }
   catch(e) {
       console.error(e)
       return false
   }
}



exports.getTodo = async function (USER_ID,DATE) {
    try{
        return await todo_data.find({
            USER_ID: USER_ID,
            TARGET_DATE: DATE
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
            TODO_ID: TODO_ID
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
            TODO_ID: TODO_ID
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