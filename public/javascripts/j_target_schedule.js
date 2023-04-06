window.onload = async function (event) {
    headlineInit()
    let calendar = new JH_calendar(document.getElementById("calendar_div"), new Date(),true)
    await initShared()
    let selectTag = document.getElementById("shared_todo_id")
    let sharedId = selectTag.options[selectTag.selectedIndex].text
    if(sharedId) {
        let todoObj = await initTodo(sharedId)

        calendar.daySelected = function (day) {
            todoObj.getDateTodo(day)
        }
    }

    async function initTodo(ID) {
        return new Promise((resolve,reject) => (
            requestFunction("GET","/todolist/my?ID="+ID+"&date="+(new Date().getDate()),{},"JSON",function (result) {
                resolve(new TODO(result.result,document.getElementById("todo_container_div")))
            })
        ))
    }

    async function initShared() {
        return new Promise((resolve,reject) => (
            requestFunction("GET","/todo-share/request/accept",{},"JSON",function (result) {
                if(result.status) {
                    let container = document.getElementById("shared_todo_id")
                    if(result.result.length!==0) {
                        let temp = document.createDocumentFragment()
                        for(let i=0;i<result.result.length;i++) {
                            let tempOption = document.createElement("option")
                            tempOption.innerText = result.result[i].TARGET_USER_ID;
                            temp.appendChild(tempOption)
                        }
                        container.append(temp)
                    }
                }
            })
        ))
    }


}