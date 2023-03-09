window.onload = async function (event) {
    headlineInit()
    let calendar = new JH_calendar(document.getElementById("calendar_div"), new Date())
    let todoObj = await initTodo()

    async function initTodo() {
        return new Promise((resolve,reject) => (
            // requestFunction("GET","/todolist/my?date="+(new Date().getDate()),{},"JSON",function (result) {
            //     resolve(new TODO(result.result,document.getElementById("todo_container_div")))
            resolve(new TODO([],document.getElementById("todo_container_div")))
            // })
        ))
    }
}