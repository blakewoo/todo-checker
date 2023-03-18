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
        this.printTodo(TODO_LIST)
    }

    TODO.prototype.printTodo = function (TODO_LIST) {
        this.TODO_CONTAINER.innerHTML = ""
        for(let i=0;i<TODO_LIST.length;i++) {
            this.addFrontTodo(TODO_LIST[i])
        }
    }

    /**
     * TODO 추가
     * @param TODO_OBJ : TODO_OBJECT
     * @returns {string|Boolean}
     */
    TODO.prototype.addTodo = async function (TODO_OBJ,TARGET_DATE) {
        // TODO 값 검증 루틴
        if(!TODO_OBJ.Value) {
            return false
        }
        if(this.READ_ONLY) {
            return false
        }
        let sendData = {
            CREATED_DATE:new Date(),
            TARGET_DATE:TARGET_DATE,
            DATA:TODO_OBJ.Value,
        }
        let result = await this.addBackTodo(sendData,TARGET_DATE)
        if(result) {
            TODO_OBJ.DeadLine = null
            TODO_OBJ.isCompleted = false
            TODO_OBJ.ID = result.result._id
            this.TODO_Map.set(TODO_OBJ.ID,TODO_OBJ);
            this.addFrontTodo(TODO_OBJ)
            return true
        }
        else {
            return false
        }
    }

    TODO.prototype.addBackTodo =async function (sendData) {
        try{
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
        todoLabel.innerText = TODO.Value
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
        if(TODO.DEAD_LINE) {
            dateDiv.innerText = TODO.DEAD_LINE
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


    TODO.prototype.listConvertTodoObject = function (RAW_LIST) {
        let result = []
        for(let i=0;i<RAW_LIST.length;i++) {
            result.push(new TODO_OBJECT(RAW_LIST[i]._id,RAW_LIST[i].DATA,RAW_LIST[i].CREATED_DATE,RAW_LIST[i].DEAD_LINE,RAW_LIST[i].isDone))
        }
        return result;
    }

    /**
     * 특정 날짜의 TODO 값 가져오기
     * @param date : Date
     */
    TODO.prototype.getDateTodo =async function (date) {
        // 백엔드에서 요청해서 갖고 오기
        let result = await syncRequestFunction("GET","/todolist/my?date="+date.getTime(),null,"JSON")
        if(result.status) {
            this.printTodo(this.listConvertTodoObject(result.result))
        }
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

    TODO.prototype.setDateTodoEvent = function () {

    }

    function addTodoModifyEvent(event) {
        let currentTodo = event.currentTarget;
        if(prevTodoModify) {
            prevTodoModify.remove()
        }
        addTodoModify(event.clientX, event.clientY, function (today,tomorrow, selectedDate, completedToggle, deleteDiv,toastMessageDiv) {
            todoModify = toastMessageDiv
            prevTodoModify = toastMessageDiv
            today.addEventListener("click",setTodayEvent)
            tomorrow.addEventListener("click", setTomorrowEvent)
            selectedDate.addEventListener("click", setDateTodoEvent)
            completedToggle.addEventListener("click", setCompletedTodoEvent)
            deleteDiv.addEventListener("click", function (event) {
                event.currentTarget.parentNode.remove()
            })
        })

        function setTodayEvent(event) {
            // backend

            // front
            currentTodo.parentNode.querySelector(".todo_date_limit_div").innerText = "오늘까지"
            todoModify.remove()
        }

        function setTomorrowEvent(event) {
            // backend

            // front
            currentTodo.parentNode.querySelector(".todo_date_limit_div").innerText = "다음날까지"
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
        let id = event.currentTarget.parentNode.parentNode.querySelector("input[type=checkbox]").getAttribute("id")
        let current = event.currentTarget
        requestFunction("DELETE","/todolist/my",{TODO_ID:id},"JSON",function (result) {
            // frontend
            if(result.status) {
                current.parentNode.parentNode.remove()
            }
        })
    }

    function addTodoModify(x, y, callback) {
        let html = document.getElementsByTagName("html")[0]

        let toastMessageDiv = document.createElement("div")
        toastMessageDiv.style.position = "absolute"
        toastMessageDiv.style.width = "100px"
        toastMessageDiv.style.height = "80px"
        toastMessageDiv.style.top = y + "px"
        toastMessageDiv.style.left = x - 100 + "px"
        toastMessageDiv.style.border = "#000000 1px solid"
        toastMessageDiv.style.background = "white"

        let todayLabel = document.createElement("div")
        todayLabel.innerText = "오늘까지"
        todayLabel.classList.add("todo_detail_div")

        let tomorrowLabel = document.createElement("div")
        tomorrowLabel.innerText = "다음날까지"
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

        toastMessageDiv.appendChild(todayLabel)
        toastMessageDiv.appendChild(tomorrowLabel)
        toastMessageDiv.appendChild(selectDate)
        toastMessageDiv.appendChild(toggleCompleted)
        toastMessageDiv.appendChild(deleteDiv)
        html.appendChild(toastMessageDiv)

        return callback(todayLabel,tomorrowLabel, selectDate, toggleCompleted, deleteDiv,toastMessageDiv)
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

