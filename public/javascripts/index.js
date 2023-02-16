window.onload = async function (event) {
    let calendar = new JH_calendar(document.getElementById("calendar_div"), new Date())
    // let todoObj = await initTodo()
    let todoModify;
    document.getElementById("todo_input").addEventListener("keyup", todoInputEvent)

    async function initTodo() {
        return new Promise((resolve,reject) => (
            requestFunction("GET","/todolist/my?date="+(new Date().getDate()),{},"JSON",function (result) {
                resolve(new TODO(result.TODO_LIST,result.ID_HEAD))
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

        let completedSpan =document.createElement("span")
        completedSpan.classList.add("completed_check_span")

        let hiddenCheckBox = document.createElement("input");
        hiddenCheckBox.type = "checkbox"
        hiddenCheckBox.style.display = "none";
        hiddenCheckBox.id = "1"

        let showCheckBoxLabel = document.createElement("label")
        showCheckBoxLabel.htmlFor = "1"

        completedSpan.appendChild(hiddenCheckBox)
        completedSpan.appendChild(showCheckBoxLabel)

        let labelContainerDiv = document.createElement("div")
        labelContainerDiv.classList.add("todo_label_container_div")

        let todoLabel = document.createElement("label")
        todoLabel.classList.add("todo_label")
        todoLabel.innerText = todo
        let modifyDiv = document.createElement("span")
        modifyDiv.addEventListener("click", addTodoModifyEvent)
        modifyDiv.innerText = "···"
        modifyDiv.classList.add("todo_modify")
        let deleteDiv = document.createElement("span")
        deleteDiv.addEventListener("click", addTodoDeleteEvent)
        deleteDiv.innerText = "X"
        deleteDiv.classList.add("todo_delete")

        let dateDiv = document.createElement("div")
        dateDiv.classList.add("todo_date_limit_div")
        dateDiv.innerText = "기한 없음"

        labelContainerDiv.appendChild(todoLabel)
        labelContainerDiv.appendChild(deleteDiv)
        labelContainerDiv.appendChild(modifyDiv)
        labelContainerDiv.appendChild(dateDiv)
        containerDiv.appendChild(labelContainerDiv)
        containerDiv.appendChild(completedSpan)
        todoContainer.appendChild(containerDiv)
    }

    function addBackTodo(todo) {

    }

    function addTodoModifyEvent(event) {
        let currentTodo = event.currentTarget;
        addTodoModify(event.clientX, event.clientY, function (tomorrow, selectedDate, completedToggle, deleteDiv,toastMessageDiv) {
            todoModify = toastMessageDiv
            tomorrow.addEventListener("click", setTomorrowEvent)
            selectedDate.addEventListener("click", setDateTodoEvent)
            completedToggle.addEventListener("click", setCompletedTodoEvent)
            deleteDiv.addEventListener("click", function (event) {
                event.currentTarget.parentNode.remove()
            })
        })

        function setTomorrowEvent(event) {
            // front
            currentTodo.parentNode.querySelector(".todo_date_limit_div").innerText = "내일까지"
            todoModify.remove()
            // backend

        }

        function setDateTodoEvent(event) {
            // front
            currentTodo.parentNode.querySelector(".todo_date_limit_div").innerText = "언제까지"
            todoModify.remove()
            // backend

        }

        function setCompletedTodoEvent(event) {
            // front

            todoModify.remove()
            // backend

        }
    }

    function addTodoDeleteEvent(event) {
        // frontend
        event.currentTarget.parentNode.parentNode.remove()
        // backend

    }

    function addTodoModify(x, y, callback) {
        let html = document.getElementsByTagName("html")[0]

        let toastMessageDiv = document.createElement("div")
        toastMessageDiv.style.position = "absolute"
        toastMessageDiv.style.width = "100px"
        toastMessageDiv.style.height = "60px"
        toastMessageDiv.style.top = y + "px"
        toastMessageDiv.style.left = x - 100 + "px"
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

        return callback(tomorrowLabel, selectDate, toggleCompleted, deleteDiv,toastMessageDiv)
    }
}