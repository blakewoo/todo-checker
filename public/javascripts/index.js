window.onload = function (event) {
    new JH_calendar(document.getElementById("calendar_div"),new Date())
    printTodoList(new Date())
    document.getElementById("todo_input").addEventListener("keyup",todoInputEvent)
}

function printTodoList (date) {
    let url = "/todolist/my?date="+date.getTime()
    // requestFunction("GET",url,"","JSON",function (result) {
    //
    // })
}

function todoInputEvent(event) {
    if(event.key==="Enter") {
        let Data = event.currentTarget.value
        event.currentTarget.value = ""
        addTodo(Data)
    }
}

function addTodo(todo) {
    addFrontTodo(todo)
    addBackTodo(todo)
}

function addFrontTodo(todo) {
    let todoContainer = document.getElementById("todo_container_div")
    let containerDiv = document.createElement("div")
    containerDiv.classList.add("todo_div")
    let todoLabel = document.createElement("label")
    todoLabel.classList.add("todo_label")
    todoLabel.innerText = todo
    let modifyDiv = document.createElement("span")
    modifyDiv.addEventListener("click",addTodoModifyEvent)
    modifyDiv.innerText="M"
    modifyDiv.classList.add("todo_modify")
    let deleteDiv = document.createElement("span")
    deleteDiv.addEventListener("click",addTodoDeleteEvent)
    deleteDiv.innerText="X"
    deleteDiv.classList.add("todo_delete")

    containerDiv.appendChild(todoLabel)
    containerDiv.appendChild(deleteDiv)
    containerDiv.appendChild(modifyDiv)
    todoContainer.appendChild(containerDiv)
}

function addTodoModifyEvent(event) {

}

function addTodoDeleteEvent(event) {

}

function addBackTodo(todo) {

}