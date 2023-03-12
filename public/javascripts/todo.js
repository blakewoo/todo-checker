'use strict'

let todoModify;
let prevTodoModify;

let TODO = (function () {
    /**
     * TODO 객체 생성자
     * @param TODO_LIST : TODO_OBJECT[]
     * @param ID_HEAD : string
     * @constructor
     */
    function TODO (TODO_LIST,TODO_CONTAINER,READ_ONLY) {
        let tempMap = new Map();
        for(let i=0;i<TODO_LIST.length;i++) {
            tempMap.set(TODO_LIST[i].ID,TODO_LIST[i].DATA)
        }
        this.TODO_Map = tempMap

        // 이후 프론트 엔드 병합시 사용
        this.TODO_CONTAINER = TODO_CONTAINER
        this.READ_ONLY = READ_ONLY
        for(let i=0;i<TODO_LIST.length;i++) {
            this.addFrontTodo(TODO_LIST[i])
        }
    }

    /**
     * TODO 추가
     * @param TODO_OBJ : TODO_OBJECT
     * @returns {string|Boolean}
     */
    TODO.prototype.addTodo = async function (TODO_OBJ) {
        // TODO 값 검증 루틴
        if(!TODO_OBJ.Value) {
            return false
        }
        if(this.READ_ONLY) {
            return false
        }
        let sendData = {
            CREATED_DATE:new Date(),
            DATA:TODO_OBJ.Value
        }
        let result = await this.addBackTodo(sendData)
        if(result) {
            TODO_OBJ.DeadLine = null
            TODO_OBJ.isCompleted = false
            TODO_OBJ.ID = result.result._id
            this.TODO_Map.set(TODO_OBJ.ID,TODO_OBJ);
            this.addFrontTodo({ID:TODO_OBJ.ID,DATA:TODO_OBJ})
            return true
        }
        else {
            return false
        }
    }

    TODO.prototype.addBackTodo =async function (sendData) {
        try{
            console.log("aa?")
            return await syncRequestFunction("POST","/todolist/my",sendData,"JSON")
        }
        catch(e) {
            console.error(e)
            return false
        }
    }

    TODO.prototype.addFrontTodo = function (TODO) {
        let todoContainer = this.TODO_CONTAINER
        let containerDiv = document.createElement("div")
        containerDiv.classList.add("todo_div")

        let completedSpan =document.createElement("span")
        completedSpan.classList.add("completed_check_span")

        let hiddenCheckBox = document.createElement("input");
        hiddenCheckBox.type = "checkbox"
        hiddenCheckBox.style.display = "none";
        hiddenCheckBox.id = TODO.ID

        let showCheckBoxLabel = document.createElement("label")
        showCheckBoxLabel.htmlFor = TODO.ID

        completedSpan.appendChild(hiddenCheckBox)
        completedSpan.appendChild(showCheckBoxLabel)

        let labelContainerDiv = document.createElement("div")
        labelContainerDiv.classList.add("todo_label_container_div")

        let todoLabel = document.createElement("label")
        todoLabel.classList.add("todo_label")
        todoLabel.innerText = TODO.DATA.Value
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
        if(TODO.DATA.DEAD_LINE) {
            dateDiv.innerText = TODO.DATA.DEAD_LINE
        }
        else {
            dateDiv.innerText = "기한 없음"
        }

        labelContainerDiv.appendChild(todoLabel)
        labelContainerDiv.appendChild(deleteDiv)
        labelContainerDiv.appendChild(modifyDiv)
        labelContainerDiv.appendChild(dateDiv)
        containerDiv.appendChild(labelContainerDiv)
        containerDiv.appendChild(completedSpan)
        todoContainer.appendChild(containerDiv)
    }



    /**
     * TODO 변경
     * @param TODO_ID : string
     * @param TODO_OBJ : TODO_OBJECT
     * @returns {boolean}
     */
    TODO.prototype.updateTodo = function (TODO_ID,TODO_OBJ) {
        let result = true
        //front update
        this.TODO_Map.set(TODO_ID,TODO_OBJ)

        // back update

        return result
    }


    /**
     * 특정 날짜의 TODO 값 가져오기
     * @param date : Date
     */
    TODO.prototype.getDateTodo = function (date) {
        // 백엔드에서 요청해서 갖고 오기

        // 프론트엔드에서 요청해서 갖고 오기

    }

    /**
     * TODO 값 가져오기
     * @param TODO_ID : string
     * @returns {TODO_OBJECT}
     */
    TODO.prototype.getTodo = function (TODO_ID) {
        return this.TODO_Map.get(TODO_ID)
    }

    /**
     * TODO 완료 처리
     * @param TODO_ID : string
     * @returns {boolean}
     */
    TODO.prototype.toggleTodoCompleted = function (TODO_ID) {
        let result = true
        //front update
        let temp = this.TODO_Map.get(TODO_ID)
        temp.isCompleted = true
        this.TODO_Map.set(TODO_ID,temp)

        // back update

        return result
    }

    /**
     * TODO 삭제
     * @param TODO_ID : string
     * @returns {boolean}
     */
    TODO.prototype.deleteTodo = function (TODO_ID) {
        let result = true
        // front update
        this.TODO_Map.delete(TODO_ID)

        // back update

        return result
    }

    return TODO
}())

let TODO_OBJECT = (function () {
    /**
     * TODO 객체 초기화
     * @param Value
     * @param CreatedDate
     * @param DeadLine
     * @param isCompleted
     * @constructor
     */
    function TODO_OBJECT (ID,Value,CreatedDate,DeadLine,isCompleted) {
        this.ID = ID
        this.Value = Value;
        this.CreatedDate = CreatedDate;
        this.DeadLine = DeadLine
        this.isCompleted = isCompleted
    }
    return TODO_OBJECT;
}())

function addTodoModifyEvent(event) {
    let currentTodo = event.currentTarget;
    if(prevTodoModify) {
        prevTodoModify.remove()
    }
    addTodoModify(event.clientX, event.clientY, function (tomorrow, selectedDate, completedToggle, deleteDiv,toastMessageDiv) {
        todoModify = toastMessageDiv
        prevTodoModify = toastMessageDiv
        tomorrow.addEventListener("click", setTomorrowEvent)
        selectedDate.addEventListener("click", setDateTodoEvent)
        completedToggle.addEventListener("click", setCompletedTodoEvent)
        deleteDiv.addEventListener("click", function (event) {
            event.currentTarget.parentNode.remove()
        })
    })

    function setTomorrowEvent(event) {
        // backend

        // front
        currentTodo.parentNode.querySelector(".todo_date_limit_div").innerText = "내일까지"
        todoModify.remove()
    }

    function setDateTodoEvent(event) {
        // backend

        // front
        currentTodo.parentNode.querySelector(".todo_date_limit_div").innerText = "언제까지"
        todoModify.remove()
    }

    function setCompletedTodoEvent(event) {
        // backend

        // front
        todoModify.remove()
    }
}

function addTodoDeleteEvent(event) {
    if(prevTodoModify) {
        prevTodoModify.remove()
    }
    // backend


    // frontend
    event.currentTarget.parentNode.parentNode.remove()
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