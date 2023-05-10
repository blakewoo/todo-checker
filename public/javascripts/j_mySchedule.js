window.onload = async function (event) {
    headlineInit()
    let calendar = new JH_calendar(document.getElementById("calendar_div"), new Date(),false)
    let todoObj = await initTodo()

    let monthEvent = await getNotificationTodo(new Date())
    calendar.setMonthlyEvent(monthEvent)

    calendar.daySelected = function (day) {
        let id = document.querySelector(".todo_category_span.active").getAttribute("id")
        todoObj.getDateTodo(day,false,null,id)
    }

    calendar.setPaintTarget()

    document.getElementById("todo_input").addEventListener("keyup", todoInputEvent)

    document.getElementById("calendarViewTodo").addEventListener("click",viewingTodo)
    document.getElementById("dailyTodo").addEventListener("click",dailyTodo)
    document.getElementById("weeklyTodo").addEventListener("click",weeklyTodo)
    document.getElementById("monthlyTodo").addEventListener("click",monthlyTodo)

    async function initTodo() {
        return new Promise((resolve,reject) => (
            requestFunction("GET","/todolist/my/daily?date="+new Date().getTime(),{},"JSON",function (result) {
                if(result.status) {
                    let temp_list = []
                    for(let i=0;i<result.result.length;i++) {
                        let temp = result.result[i]
                        temp_list.push(new TODO_OBJECT(temp._id,temp.DATA,temp.CREATED_DATE,temp.DEAD_LINE,temp.IS_DONE))
                    }

                    resolve(new TODO(temp_list,document.getElementById("todo_container_div"),false,"DAILY"))
                }
                else {
                    resolve(new TODO([],document.getElementById("todo_container_div"),false,"DAILY"))
                }
            })
        ))
    }

    function todoInputEvent(event) {
        if (event.key === "Enter") {
            let Data = event.currentTarget.value

            if (Data === "") {
                return
            }
            let id = document.querySelector(".todo_category_span.active").getAttribute("id")
            event.currentTarget.value = ""
            let temp = new TODO_OBJECT(null,Data,calendar.seletedDate,null,false)
            if(todoObj.addTodo(temp,calendar.seletedDate,id) && id==="calendarViewTodo"){
                let tempMap = calendar.getMonthlyEvent()
                let targetDate = calendar.seletedDate
                let tempObj = tempMap.get(targetDate.getFullYear()+"-"+(targetDate.getMonth()+1)+"-"+targetDate.getDate())
                if(tempObj){
                    tempObj.push(Data)
                    tempMap.set(targetDate.getFullYear()+"-"+(targetDate.getMonth()+1)+"-"+targetDate.getDate(),tempObj)
                }
                else {
                    tempMap.set(targetDate.getFullYear()+"-"+(targetDate.getMonth()+1)+"-"+targetDate.getDate(),[Data])
                }
                calendar.setMonthlyEvent(tempMap)
                calendar.setPaintTarget()
            }
        }
    }

    function viewingTodo(event) {
        document.querySelector(".todo_category_span.active").classList.remove("active")
        event.currentTarget.classList.add("active")
        let targetDate = ""
        requestFunction("GET","/todolist/my/notification/daily?date="+(calendar.seletedDate).getTime(),{},"JSON",function (result) {
            if(result.status) {
                let temp_list = []
                for(let i=0;i<result.result.length;i++) {
                    let temp = result.result[i]
                    temp_list.push(new TODO_OBJECT(temp._id,temp.DATA,temp.CREATED_DATE,temp.DEAD_LINE,temp.IS_DONE))
                }
                todoObj = new TODO(temp_list,document.getElementById("todo_container_div"),false,"NOTIFICATION")
            }
        })
    }

    function dailyTodo(event) {
        document.querySelector(".todo_category_span.active").classList.remove("active")
        event.currentTarget.classList.add("active")
        requestFunction("GET","/todolist/my/daily?date="+(calendar.seletedDate).getTime(),{},"JSON",function (result) {
            if(result.status) {
                let temp_list = []
                for(let i=0;i<result.result.length;i++) {
                    let temp = result.result[i]
                    temp_list.push(new TODO_OBJECT(temp._id,temp.DATA,temp.CREATED_DATE,temp.DEAD_LINE,temp.IS_DONE))
                }
                todoObj = new TODO(temp_list,document.getElementById("todo_container_div"),false,"DAILY")
            }
        })
    }

    function weeklyTodo(event) {
        document.querySelector(".todo_category_span.active").classList.remove("active")
        event.currentTarget.classList.add("active")
        requestFunction("GET","/todolist/my/weekly?date="+(calendar.seletedDate).getTime(),{},"JSON",function (result) {
            if(result.status) {
                let temp_list = []
                for(let i=0;i<result.result.length;i++) {
                    let temp = result.result[i]
                    temp_list.push(new TODO_OBJECT(temp._id,temp.DATA,temp.CREATED_DATE,temp.DEAD_LINE,temp.IS_DONE))
                }
                todoObj = new TODO(temp_list,document.getElementById("todo_container_div"),false,"WEEKLY")
            }
        })
    }

    function monthlyTodo(event) {
        document.querySelector(".todo_category_span.active").classList.remove("active")
        event.currentTarget.classList.add("active")
        requestFunction("GET","/todolist/my/monthly?date="+(calendar.seletedDate).getTime(),{},"JSON",function (result) {
            if(result.status) {
                let temp_list = []
                for(let i=0;i<result.result.length;i++) {
                    let temp = result.result[i]
                    temp_list.push(new TODO_OBJECT(temp._id,temp.DATA,temp.CREATED_DATE,temp.DEAD_LINE,temp.IS_DONE))
                }
                todoObj = new TODO(temp_list,document.getElementById("todo_container_div"),false,"MONTHLY")
            }
        })
    }

    async function getNotificationTodo(targetDate) {
        return new Promise((resolve,reject)=>{
            requestFunction("GET","/todolist/my/notification/monthly?date="+targetDate.getTime(),{},"JSON",function (result){
                if(result.status) {
                    let resultMap = new Map()
                    if(result.result.length!==0) {
                        for(let i=0;i<result.result.length;i++) {
                            let temp = result.result[i]
                            let tempDate = new Date(temp.TARGET_DATE).getFullYear()+"-"+(new Date(temp.TARGET_DATE).getMonth()+1)+"-"+new Date(temp.TARGET_DATE).getDate()
                            if (resultMap.has(tempDate)) {
                                let tempData = resultMap.get(tempDate)
                                tempData.push(temp.DATA)
                                resultMap.set(tempDate,tempData)
                            }
                            else {
                                resultMap.set(tempDate,[temp.DATA])
                            }
                        }
                    }
                    resolve(resultMap)
                }
                else {
                    reject(null)
                }
            })
        })
    }
}