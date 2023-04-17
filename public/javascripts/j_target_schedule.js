window.onload = async function (event) {
    headlineInit()
    let calendar = new JH_calendar(document.getElementById("calendar_div"), new Date(),true)
    await initShared()
    let selectTag = document.getElementById("sharedTodoSelect")
    let sharedId = selectTag.options[selectTag.selectedIndex].text
    if(sharedId) {
        let todoObj = await initTodo(sharedId)

        calendar.daySelected = function (day) {
            todoObj.getDateTodo(day,true,sharedId)
        }
    }

    document.getElementById("calendarViewTodo").addEventListener("click",viewingTodo)
    document.getElementById("dailyTodo").addEventListener("click",dailyTodo)
    document.getElementById("weeklyTodo").addEventListener("click",weeklyTodo)
    document.getElementById("monthlyTodo").addEventListener("click",monthlyTodo)

    async function initTodo(ID) {
        return new Promise((resolve,reject) => (
            requestFunction("GET","/todolist/target?ID="+ID+"&date="+((new Date()).getTime()),null,"JSON",function (result) {
                if(result.status) {
                    let temp_list = []
                    for(let i=0;i<result.result.length;i++) {
                        let temp = result.result[i]
                        temp_list.push(new TODO_OBJECT(temp._id,temp.DATA,temp.CREATED_DATE,temp.DEAD_LINE,temp.IS_DONE))
                    }

                    resolve(new TODO(temp_list,document.getElementById("todo_container_div"),true))
                }
                else {
                    reject(new TODO([],document.getElementById("todo_container_div")))
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

    }

    function dailyTodo(event) {

    }

    function weeklyTodo(event) {

    }

    function monthlyTodo(event) {

    }
}