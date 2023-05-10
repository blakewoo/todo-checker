const todo_data = require("../model/md_to-do")
const time_data = require("../module/m_timezone")


exports.addTodo = async function (USER_ID,DATE,TARGET_DATE,TODO_DATA,TYPE) {
   try{
       let result = await todo_data.create({
           USER_ID: USER_ID,
           TARGET_DATE:TARGET_DATE,
           CREATED_DATE: DATE,
           DEAD_LINE:null,
           DATA: TODO_DATA,
           TYPE:TYPE,
           IS_DONE: false
       })
       return result
   }
   catch(e) {
       console.error(e)
       return false
   }
}



exports.getDailyTodo = async function (USER_ID,DATE) {
    try{
        // 나라 기준으로 0시0분부터 23시 59분까지의 값을 갖고 와야함
        // let startDate = time_data.getStartTime(DATE)
        // let endDate = time_data.getEndTime(DATE)
        let startDate = new Date(DATE.setHours(0,0,0,0))
        let endDate = new Date(DATE.setHours(24,0,0,0))
        return await todo_data.find({
            USER_ID: USER_ID,
            TYPE:"DAILY",
            $or:[{TARGET_DATE: {"$gte":startDate,"$lt":endDate}},{DEAD_LINE: {"$gte":startDate,"$lt":endDate}}]
        })
    }
    catch(e) {
        console.error(e)
        return false
    }
}

exports.getWeeklyTodo = async function (USER_ID,DATE) {
    try{
        let startDate = new Date(DATE.setHours(0,0,0,0))
        let dow = startDate.getDay()
        startDate.setDate(startDate.getDate()-dow)
        let endDate = new Date(startDate)
        endDate.setDate(endDate.getDate()+6)

        return await todo_data.find({
            USER_ID: USER_ID,
            TYPE:"WEEKLY",
            $or:[{TARGET_DATE: {"$gte":startDate,"$lt":endDate}},{DEAD_LINE: {"$gte":startDate,"$lt":endDate}}]
        })
    }
    catch(e) {
        console.error(e)
        return false
    }
}

exports.getMontlyTodo = async function (USER_ID,DATE) {
    try{
        let startDate = new Date(DATE.getFullYear(), DATE.getMonth(), 1);
        let endDate = new Date(DATE.getFullYear(), DATE.getMonth() + 1, 0);
        return await todo_data.find({
            USER_ID: USER_ID,
            TYPE:"MONTHLY",
            $or:[{TARGET_DATE: {"$gte":startDate,"$lt":endDate}},{DEAD_LINE: {"$gte":startDate,"$lt":endDate}}]
        })
    }
    catch(e) {
        console.error(e)
        return false
    }
}

exports.getDailyNotificationTodo = async function (USER_ID,DATE) {
    try{
        // 나라 기준으로 0시0분부터 23시 59분까지의 값을 갖고 와야함
        // let startDate = time_data.getStartTime(DATE)
        // let endDate = time_data.getEndTime(DATE)
        let startDate = new Date(DATE.setHours(0,0,0,0))
        let endDate = new Date(DATE.setHours(24,0,0,0))
        return await todo_data.find({
            USER_ID: USER_ID,
            TYPE:"NOTIFICATION",
            $or:[{TARGET_DATE: {"$gte":startDate,"$lt":endDate}},{DEAD_LINE: {"$gte":startDate,"$lt":endDate}}]
        })
    }
    catch(e) {
        console.error(e)
        return false
    }
}

exports.getMonthlyNotificationTodo = async function (USER_ID,DATE) {
    try{
        let startDate = new Date(DATE.getFullYear(), DATE.getMonth(), 1);
        let endDate = new Date(DATE.getFullYear(), DATE.getMonth() + 1, 0);
        return await todo_data.find({
            USER_ID: USER_ID,
            TYPE:"NOTIFICATION",
            $or:[{TARGET_DATE: {"$gte":startDate,"$lt":endDate}},{DEAD_LINE: {"$gte":startDate,"$lt":endDate}}]
        })
    }
    catch(e) {
        console.error(e)
        return false
    }
}

exports.updateTodo = async function (TODO_ID,TODO_DATA) {
    try{
        let Parsed_Todo = TODO_DATA
        let targetObj = {}
        if(Parsed_Todo.DEAD_LINE!==undefined) {
            targetObj.DEAD_LINE = Parsed_Todo.DEAD_LINE
        }
        if(Parsed_Todo.IS_DONE!==undefined){
            targetObj.IS_DONE = Parsed_Todo.IS_DONE
        }
        if(Parsed_Todo.DATA!==undefined) {
            targetObj.DATA = Parsed_Todo.DATA
        }
        await todo_data.updateOne({
            _id: TODO_ID
        },targetObj)
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