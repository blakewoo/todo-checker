window.onload = async function (event) {
    headlineInit()
    let calendar = new JH_calendar(document.getElementById("calendar_div"), new Date(),false)
    let todoObj = await initTodo()

    document.getElementById("todo_input").addEventListener("keyup", todoInputEvent)

    async function initTodo() {
        return new Promise((resolve,reject) => (
            requestFunction("GET","/todolist/my?date="+new Date().getTime(),{},"JSON",function (result) {
                if(result.status) {
                    let temp_list = []
                    for(let i=0;i<result.result.length;i++) {
                        let temp = result.result[i]
                        temp_list.push({ID:temp._id,DATA:new TODO_OBJECT(temp._id,temp.DATA,temp.CREATED_DATE,temp.DEAD_LINE,temp.isDone)})
                    }
                    resolve(new TODO(temp_list,document.getElementById("todo_container_div"),false))
                }
                else {
                    resolve(new TODO([],document.getElementById("todo_container_div"),false))
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
            event.currentTarget.value = ""
            let temp = new TODO_OBJECT(null,Data,new Date(),null,false)
            todoObj.addTodo(temp)
        }
    }

}