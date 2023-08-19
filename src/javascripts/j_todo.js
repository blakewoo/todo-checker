'use strict'
let publicFunction = require("./j_publicFunction")
let JH_datepicker = require("./j_datepicker")

let todoModify;
let prevTodoModify;

let TODO = (function () {
    /**
     * TODO 객체 생성자
     * @param TODO_LIST : TODO_OBJECT[]
     * @param ID_HEAD : string
     * @constructor
     */
    function TODO (TODO_LIST,TODO_CONTAINER,READ_ONLY,TYPE) {
        // 이후 프론트 엔드 병합시 사용
        this.TODO_CONTAINER = TODO_CONTAINER
        this.READ_ONLY = READ_ONLY
        this.TYPE = TYPE
        this.printTodo(TODO_LIST)
        document.getElementsByTagName("body")[0].addEventListener("click",function (e){
            if(document.getElementsByClassName("todo_modify_div")[0] && !e.target.classList.contains("todo_modify_div") && !e.target.classList.contains("jh_datepicker_div_table_thead_prev") && !e.target.classList.contains("jh_datepicker_div_table_thead_after")) {
                document.getElementsByClassName("todo_modify_div")[0].remove()
            }
        })
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
     * @param TARGET_DATE
     * @param TYPE
     * @returns {string|Boolean}
     */
    TODO.prototype.addTodo = async function (TODO_OBJ,TARGET_DATE,TYPE) {
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
            DATA:TODO_OBJ.Value
        }

        let result = await this.addBackTodo(sendData,TYPE)
        if(result) {
            TODO_OBJ.DeadLine = null
            TODO_OBJ.IS_DONE = false
            TODO_OBJ.ID = result.result._id
            this.addFrontTodo(TODO_OBJ)
            return true
        }
        else {
            return false
        }
    }

    TODO.prototype.addBackTodo =async function (sendData,todoType) {
        try{
            let url = "/todolist/my/daily"
            if(todoType === "dailyTodoSpan") {
                url = "/todolist/my/daily"
            }
            else if(todoType === "weeklyTodoSpan") {
                url = "/todolist/my/weekly"
            }
            else if(todoType === "monthlyTodoSpan") {
                url = "/todolist/my/monthly"
            }
            else {
                url = "/todolist/my/notification"
            }
            return await publicFunction.syncRequestFunction("POST",url,sendData,"JSON")
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
        completedSpan.classList.add("completedCheck_span")

        let hiddenCheckBox = document.createElement("input");
        hiddenCheckBox.type = "checkbox"
        hiddenCheckBox.style.display = "none";
        hiddenCheckBox.id = TODO.ID

        let showCheckBoxLabel = document.createElement("label")
        showCheckBoxLabel.htmlFor = TODO.ID;
        hiddenCheckBox.checked = TODO.IS_DONE;

        if(!this.READ_ONLY) {
            showCheckBoxLabel.addEventListener("click",checkTodoEvent)
        }

        completedSpan.appendChild(hiddenCheckBox)
        completedSpan.appendChild(showCheckBoxLabel)

        let labelContainerDiv = document.createElement("div")
        labelContainerDiv.classList.add("todoLabelContainer_div")

        let todoLabel = document.createElement("label")
        todoLabel.classList.add("todo_label")
        if(TODO.IS_DONE) {
            todoLabel.classList.add("todoTextMiddleLine_label")
        }
        todoLabel.innerText = TODO.Value
        todoLabel.addEventListener("click",modifyTodoEvent.bind(this))

        let modifyDiv = document.createElement("span")
        modifyDiv.addEventListener("click", addTodoModifyEvent)
        modifyDiv.innerText = "···"
        modifyDiv.classList.add("todoModifyDots_span")
        let deleteDiv = document.createElement("span")
        deleteDiv.addEventListener("click", addTodoDeleteEvent)
        deleteDiv.innerText = "X"
        deleteDiv.classList.add("todoDelete_span")

        let dateDiv = document.createElement("div")
        dateDiv.classList.add("todoDateLimit_div")

        if(TODO.DeadLine) {
            dateDiv.innerText = Intl.DateTimeFormat("ko").format(new Date(TODO.DeadLine)) + "까지"
        }
        else {
            dateDiv.innerText = "기한 없음"
        }

        labelContainerDiv.appendChild(todoLabel)
        if(!this.READ_ONLY) {
            labelContainerDiv.appendChild(deleteDiv)
            labelContainerDiv.appendChild(modifyDiv)
        }
        labelContainerDiv.appendChild(dateDiv)
        containerDiv.appendChild(labelContainerDiv)
        containerDiv.appendChild(completedSpan)
        todoContainer.appendChild(containerDiv)
    }


    TODO.prototype.listConvertTodoObject = function (RAW_LIST) {
        let result = []
        for(let i=0;i<RAW_LIST.length;i++) {
            result.push(new TODO_OBJECT(RAW_LIST[i]._id,RAW_LIST[i].DATA,RAW_LIST[i].CREATED_DATE,RAW_LIST[i].DEAD_LINE,RAW_LIST[i].IS_DONE))
        }
        return result;
    }

    /**
     * 특정 날짜의 TODO 값 가져오기
     * @param date : Date
     */
    TODO.prototype.getDateTodo =async function (date,isOthers,ID,TYPE) {
        this.TARGET_DATE = date;
        // 백엔드에서 요청해서 갖고 오기
        if(isOthers) {
            let result = await publicFunction.syncRequestFunction("GET","/todolist/target/daily?ID="+ID+"&date="+date.getTime(),null,"JSON")
            if(result.status) {
                this.printTodo(this.listConvertTodoObject(result.result))
            }
        }
        else {
            let url = ""
            if(TYPE === "dailyTodoSpan") {
                url = "/todolist/my/daily?date="+date.getTime()
            }
            else if(TYPE === "weeklyTodoSpan") {
                url = "/todolist/my/weekly?date="+date.getTime()
            }
            else if(TYPE === "monthlyTodoSpan") {
                url = "/todolist/my/monthly?date="+date.getTime()
            }
            else {
                url = "/todolist/my/notification/daily?date="+date.getTime()
            }

            let result = await publicFunction.syncRequestFunction("GET",url,null,"JSON")
            if(result.status) {
                this.printTodo(this.listConvertTodoObject(result.result))
            }
        }
    }

    function modifyTodoEvent(event) {
        if(this.READ_ONLY) {
            return
        }
        let originLabel = event.currentTarget;
        let textBuffer = originLabel.innerText;
        event.currentTarget.style.display = "none"

        let textInput = document.createElement("textarea")
        textInput.innerText = textBuffer
        textInput.classList.add("modify_textarea")
        textInput.addEventListener("focusout",function (event2) {
            let todoID = event.target.parentNode.parentNode.querySelector(".completedCheck_span").firstChild.id
            let afterText= event2.target.value
            publicFunction.requestFunction("PUT","/todolist/my/daily",{TODO_ID:todoID,TODO_DATA:{DATA:afterText}},"JSON",function (result){
                if(result.status) {
                    originLabel.innerText = event2.target.value;
                    originLabel.style.display = ""
                    event2.target.remove()
                }
            })
        }.bind(this))
        originLabel.parentNode.insertBefore(textInput,originLabel.parentNode.firstChild)
        textInput.focus()
    }

    function addTodoModifyEvent(event) {
        event.stopPropagation()
        let currentTodo = event.currentTarget;
        if(prevTodoModify) {
            prevTodoModify.remove()
        }
        addTodoModify(event.clientX, event.clientY, function (today,tomorrow, selectedDate, completedToggle,toastMessageDiv) {
            todoModify = toastMessageDiv
            prevTodoModify = toastMessageDiv
            today.addEventListener("click",setTodayEvent)
            tomorrow.addEventListener("click", setTomorrowEvent)
            selectedDate.addEventListener("click", setDateTodoEvent)
            completedToggle.addEventListener("click", setCompletedTodoEvent)
        })

        function setTodayEvent(event) {
            let today = new Date((new Date()).setHours(0,0,0,0))
            let id = currentTodo.parentNode.parentNode.querySelector("input[type=checkbox]").getAttribute("id")
            publicFunction.requestFunction("PUT","/todolist/my/daily",{TODO_ID:id,TODO_DATA:{DEAD_LINE:today}},"JSON",function (result) {
                if(result.status) {
                    currentTodo.parentNode.querySelector(".todoDateLimit_div").innerText = "오늘까지"
                    todoModify.remove()
                }
            })
        }

        function setTomorrowEvent(event) {
            let today = new Date()
            let tomorrowDay = new Date(today.getFullYear(),today.getMonth(),today.getDate()+1)
            let id = currentTodo.parentNode.parentNode.querySelector("input[type=checkbox]").getAttribute("id")
            publicFunction.requestFunction("PUT","/todolist/my/daily",{TODO_ID:id,TODO_DATA:{DEAD_LINE:tomorrowDay}},"JSON",function (result) {
                if(result.status) {
                    currentTodo.parentNode.querySelector(".todoDateLimit_div").innerText = "내일까지"
                    todoModify.remove()
                }
            })
        }

        function setDateTodoEvent(event) {
            let datepicker = new JH_datepicker(event.clientX,event.clientY,new Date())
            datepicker.getDay = function (day) {
                let id = currentTodo.parentNode.parentNode.querySelector("input[type=checkbox]").getAttribute("id")
                publicFunction.requestFunction("PUT","/todolist/my/daily",{TODO_ID:id,TODO_DATA:{DEAD_LINE:day}},"JSON",function (result) {
                    if(result.status) {
                        currentTodo.parentNode.querySelector(".todoDateLimit_div").innerText = Intl.DateTimeFormat("ko").format(day)+"까지"
                    }
                })
            }
        }

        function setCompletedTodoEvent(event) {
            // backend
            let check = currentTodo.parentNode.parentNode.querySelector("input[type=checkbox]")
            let flag = currentTodo.parentNode.parentNode.querySelector("input[type=checkbox]").checked
            let id = currentTodo.parentNode.parentNode.querySelector("input[type=checkbox]").getAttribute("id")
            publicFunction.requestFunction("PUT","/todolist/my/daily",{TODO_ID:id,TODO_DATA:{IS_DONE:!flag}},"JSON",function (result) {
                if(result.status) {
                    check.checked = !flag
                    if(flag) {
                        check.parentNode.parentNode.querySelector(".todo_label").classList.remove("todoTextMiddleLine_label")
                    }
                    else{
                        check.parentNode.parentNode.querySelector(".todo_label").classList.add("todoTextMiddleLine_label")
                    }
                }
            })
            // front
            todoModify.remove()
        }
    }

    function checkTodoEvent(event) {
        let currentTarget= event.currentTarget
        let id = event.currentTarget.parentNode.querySelector("input[type=checkbox]").getAttribute("id")
        let flag = event.currentTarget.parentNode.querySelector("input[type=checkbox]").checked
        publicFunction.requestFunction("PUT","/todolist/my/daily",{TODO_ID:id,TODO_DATA:{IS_DONE:!flag}},"JSON",function (result) {
            if(flag) {
                currentTarget.parentNode.parentNode.querySelector(".todo_label").classList.remove("todoTextMiddleLine_label")
            }
            else{
                currentTarget.parentNode.parentNode.querySelector(".todo_label").classList.add("todoTextMiddleLine_label")
            }
        })
    }

    function addTodoDeleteEvent(event) {
        if(prevTodoModify) {
            prevTodoModify.remove()
        }
        let id = event.currentTarget.parentNode.parentNode.querySelector("input[type=checkbox]").getAttribute("id")
        let current = event.currentTarget
        publicFunction.requestFunction("DELETE","/todolist/my/daily",{TODO_ID:id},"JSON",function (result) {
            // frontend
            if(result.status) {
                current.parentNode.parentNode.remove()
            }
        })
    }

    function addTodoModify(x, y, callback) {
        let html = document.getElementsByTagName("html")[0]

        let toastMessageDiv = document.createElement("div")
        toastMessageDiv.classList.add("todo_modify_div")
        toastMessageDiv.style.position = "absolute"
        toastMessageDiv.style.width = "100px"
        toastMessageDiv.style.height = "60px"
        toastMessageDiv.style.top = y + "px"
        toastMessageDiv.style.left = x - 100 + "px"
        toastMessageDiv.style.border = "#000000 1px solid"
        toastMessageDiv.style.background = "white"

        let todayLabel = document.createElement("div")
        todayLabel.innerText = "오늘까지"
        todayLabel.classList.add("todoModifyDetail_div")

        let tomorrowLabel = document.createElement("div")
        tomorrowLabel.innerText = "다음날까지"
        tomorrowLabel.classList.add("todoModifyDetail_div")

        let selectDate = document.createElement("div")
        selectDate.innerText = "날짜 선택"
        selectDate.classList.add("todoModifyDetail_div")

        let toggleCompleted = document.createElement("div")
        toggleCompleted.innerText = "완료/미완료 전환"
        toggleCompleted.classList.add("todoModifyDetail_div")

        toastMessageDiv.appendChild(todayLabel)
        toastMessageDiv.appendChild(tomorrowLabel)
        toastMessageDiv.appendChild(selectDate)
        toastMessageDiv.appendChild(toggleCompleted)
        html.appendChild(toastMessageDiv)

        return callback(todayLabel,tomorrowLabel, selectDate, toggleCompleted,toastMessageDiv)
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
    function TODO_OBJECT (ID,Value,CreatedDate,DeadLine,IS_DONE) {
        this.ID = ID
        this.Value = Value;
        this.CreatedDate = CreatedDate;
        this.DeadLine = DeadLine
        this.IS_DONE = IS_DONE
    }
    return TODO_OBJECT;
}())

exports.TODO = TODO
exports.TODO_OBJECT = TODO_OBJECT