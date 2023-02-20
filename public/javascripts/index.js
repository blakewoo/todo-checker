window.onload = async function (event) {
    let calendar = new JH_calendar(document.getElementById("calendar_div"), new Date())
    let todoObj = await initTodo()
    let todoModify;
    let prevTodoModify;

    document.getElementById("todo_input").addEventListener("keyup", todoInputEvent)

    async function initTodo() {
        return new Promise((resolve,reject) => (
            // requestFunction("GET","/todolist/my?date="+(new Date().getDate()),{},"JSON",function (result) {
            //     resolve(new TODO(result.TODO_LIST,result.ID_HEAD))
            // })
            resolve(new TODO([],"TEST",document.getElementById("todo_container_div")))
        ))
    }

    function todoInputEvent(event) {
        if (event.key === "Enter") {
            let Data = event.currentTarget.value

            if (Data === "") {
                return
            }
            event.currentTarget.value = ""
            let temp = new TODO_OBJECT(Data,null,false)
            todoObj.addTodo(temp)
        }
    }

}