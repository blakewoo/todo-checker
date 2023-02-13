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

        if(Data===""){
            return
        }
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
    modifyDiv.innerText="···"
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

function addTodoModifyFocusoutEvent(event) {

}

function addTodoModifyEvent(event) {
    addTodoModify(event.clientX,event.clientY,function (tomorrow,selectedDate,completedToggle,deleteDiv) {
        tomorrow.addEventListener("click",function (event) {
            alert("tomorrow")
        })
        selectedDate.addEventListener("click",function (event) {
            alert("selected")
        })
        completedToggle.addEventListener("click",function (event) {
            alert("completed")
        })
        deleteDiv.addEventListener("click",function (event) {
            event.currentTarget.parentNode.remove()
        })
    })
}

function addTodoDeleteEvent(event) {

}

function addBackTodo(todo) {

}

function addTodoModify(x,y,callback) {
    let html = document.getElementsByTagName("html")[0]

    let toastMessageDiv = document.createElement("div")
    toastMessageDiv.style.position = "absolute"
    toastMessageDiv.style.width ="100px"
    toastMessageDiv.style.height ="60px"
    toastMessageDiv.style.top = y+"px"
    toastMessageDiv.style.left = x-100+"px"
    toastMessageDiv.style.border = "#000000 1px solid"
    toastMessageDiv.style.background = "white"

    let tomorrowLabel = document.createElement("div")
    tomorrowLabel.innerText = "내일까지"
    tomorrowLabel.classList.add("todo_detail_div")

    let selectDate = document.createElement("div")
    selectDate.innerText = "날짜 선택"
    selectDate.classList.add("todo_detail_div")

    let toggleCompleted = document.createElement("div")
    toggleCompleted.innerText = "완료/미완료 전환"
    toggleCompleted.classList.add("todo_detail_div")

    let deleteDiv = document.createElement("div")
    deleteDiv.innerText = "취소"
    deleteDiv.classList.add("todo_detail_div")

    toastMessageDiv.appendChild(tomorrowLabel)
    toastMessageDiv.appendChild(selectDate)
    toastMessageDiv.appendChild(toggleCompleted)
    toastMessageDiv.appendChild(deleteDiv)
    html.appendChild(toastMessageDiv)

    return callback(tomorrowLabel,selectDate,toggleCompleted,deleteDiv)
}