const todo_data = require("/model/data")

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



exports.getTodo = async function (TODO_ID) {

}

exports.getAllTodo = async function (USER_ID,DATE) {

}

exports.updateTodo = async function (TODO_ID,TODO_DATA) {

}

exports.deleteTodo = async function (TODO_ID) {

}