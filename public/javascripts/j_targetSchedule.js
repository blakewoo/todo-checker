window.onload = async function (event) {
    headlineInit()
    let calendar = new JHCalendar(document.getElementById("calendarDiv"), new Date(),true)
    await initShared()
    let selectTag = document.getElementById("sharedTodoSelect")
    let todoObj = null
    let sharedId = selectTag.options[selectTag.selectedIndex].text
    if(sharedId) {
        todoObj = await initTodo(sharedId)

        calendar.daySelected = function (day) {
            todoObj.getDateTodo(day,true,sharedId)
        }

        let monthEvent = await getNotificationTodo(sharedId,new Date())
        calendar.setMonthlyEvent(monthEvent)
        calendar.setPaintTarget()
    }


    document.getElementById("calendarViewTodoSpan").addEventListener("click",viewingTodo)
    document.getElementById("dailyTodoSpan").addEventListener("click",dailyTodo)
    document.getElementById("weeklyTodoSpan").addEventListener("click",weeklyTodo)
    document.getElementById("monthlyTodoSpan").addEventListener("click",monthlyTodo)

    async function initTodo(ID) {
        return new Promise((resolve,reject) => (
            requestFunction("GET","/todolist/target/daily?ID="+ID+"&date="+((new Date()).getTime()),null,"JSON",function (result) {
                if(result.status) {
                    let temp_list = []
                    for(let i=0;i<result.result.length;i++) {
                        let temp = result.result[i]
                        temp_list.push(new TODO_OBJECT(temp._id,temp.DATA,temp.CREATED_DATE,temp.DEAD_LINE,temp.IS_DONE))
                    }

                    resolve(new TODO(temp_list,document.getElementById("todoContainerDiv"),true))
                }
                else {
                    reject(new TODO([],document.getElementById("todoContainerDiv")))
                }
            })
        ))
    }

    async function initShared() {
        return new Promise((resolve,reject) => (
            requestFunction("GET","/todo-share/request/accept",{},"JSON",function (result) {
                if(result.status) {
                    let container = document.getElementById("sharedTodoSelect")
                    if(result.result.length!==0) {
                        let temp = document.createDocumentFragment()
                        for(let i=0;i<result.result.length;i++) {
                            let tempOption = document.createElement("option")
                            tempOption.innerText = result.result[i].TARGET_USER_ID;
                            temp.appendChild(tempOption)
                        }
                        container.append(temp)
                    }
                    resolve(true)
                }
                else{
                    reject(true)
                }
            })
        ))
    }

    function viewingTodo(event) {
        document.querySelector(".todoCategory_span.active").classList.remove("active")
        event.currentTarget.classList.add("active")
        let targetDate = ""
        requestFunction("GET","/todolist/target/notification/daily?ID="+sharedId+"&date="+(calendar.seletedDate).getTime(),{},"JSON",function (result) {
            if(result.status) {
                let temp_list = []
                for(let i=0;i<result.result.length;i++) {
                    let temp = result.result[i]
                    temp_list.push(new TODO_OBJECT(temp._id,temp.DATA,temp.CREATED_DATE,temp.DEAD_LINE,temp.IS_DONE))
                }
                todoObj = new TODO(temp_list,document.getElementById("todoContainerDiv"),true,"NOTIFICATION")
            }
        })
    }

    function dailyTodo(event) {
        document.querySelector(".todoCategory_span.active").classList.remove("active")
        event.currentTarget.classList.add("active")
        requestFunction("GET","/todolist/target/daily?ID="+sharedId+"&date="+(calendar.seletedDate).getTime(),{},"JSON",function (result) {
            if(result.status) {
                let temp_list = []
                for(let i=0;i<result.result.length;i++) {
                    let temp = result.result[i]
                    temp_list.push(new TODO_OBJECT(temp._id,temp.DATA,temp.CREATED_DATE,temp.DEAD_LINE,temp.IS_DONE))
                }
                todoObj = new TODO(temp_list,document.getElementById("todoContainerDiv"),true,"DAILY")
            }
        })
    }

    function weeklyTodo(event) {
        document.querySelector(".todoCategory_span.active").classList.remove("active")
        event.currentTarget.classList.add("active")
        requestFunction("GET","/todolist/target/weekly?ID="+sharedId+"&date="+(calendar.seletedDate).getTime(),{},"JSON",function (result) {
            if(result.status) {
                let temp_list = []
                for(let i=0;i<result.result.length;i++) {
                    let temp = result.result[i]
                    temp_list.push(new TODO_OBJECT(temp._id,temp.DATA,temp.CREATED_DATE,temp.DEAD_LINE,temp.IS_DONE))
                }
                todoObj = new TODO(temp_list,document.getElementById("todoContainerDiv"),true,"WEEKLY")
            }
        })
    }

    function monthlyTodo(event) {
        document.querySelector(".todoCategory_span.active").classList.remove("active")
        event.currentTarget.classList.add("active")
        requestFunction("GET","/todolist/target/monthly?ID="+sharedId+"&date="+(calendar.seletedDate).getTime(),{},"JSON",function (result) {
            if(result.status) {
                let temp_list = []
                for(let i=0;i<result.result.length;i++) {
                    let temp = result.result[i]
                    temp_list.push(new TODO_OBJECT(temp._id,temp.DATA,temp.CREATED_DATE,temp.DEAD_LINE,temp.IS_DONE))
                }
                todoObj = new TODO(temp_list,document.getElementById("todoContainerDiv"),true,"MONTHLY")
            }
        })
    }


    async function getNotificationTodo(ID,targetDate) {
        return new Promise((resolve,reject)=>{
            requestFunction("GET","/todolist/target/notification/monthly?ID="+ID+"&date="+targetDate.getTime(),{},"JSON",function (result){
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