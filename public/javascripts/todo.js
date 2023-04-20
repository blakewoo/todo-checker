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
    function TODO (TODO_LIST,TODO_CONTAINER,READ_ONLY,TYPE) {
        let tempMap = new Map();
        for(let i=0;i<TODO_LIST.length;i++) {
            tempMap.set(TODO_LIST[i].ID,TODO_LIST[i].DATA)
        }
        this.TODO_Map = tempMap

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
            DATA:TODO_OBJ.Value,
        }

        let result = await this.addBackTodo(sendData,TYPE)
        if(result) {
            TODO_OBJ.DeadLine = null
            TODO_OBJ.IS_DONE = false
            TODO_OBJ.ID = result.result._id
            this.TODO_Map.set(TODO_OBJ.ID,TODO_OBJ);
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
            if(todoType === "dailyTodo") {
                url = "/todolist/my/daily"
            }
            else if(todoType === "weeklyTodo") {
                url = "/todolist/my/weekly"
            }
            else if(todoType === "monthlyTodo") {
                url = "/todolist/my/monthly"
            }
            else {
                url = "/todolist/my/notification"
            }
            return await syncRequestFunction("POST",url,sendData,"JSON")
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
        showCheckBoxLabel.htmlFor = TODO.ID;
        hiddenCheckBox.checked = TODO.IS_DONE;

        if(!this.READ_ONLY) {
            showCheckBoxLabel.addEventListener("click",checkTodoEvent)
        }

        completedSpan.appendChild(hiddenCheckBox)
        completedSpan.appendChild(showCheckBoxLabel)

        let labelContainerDiv = document.createElement("div")
        labelContainerDiv.classList.add("todo_label_container_div")

        let todoLabel = document.createElement("label")
        todoLabel.classList.add("todo_label")
        if(TODO.IS_DONE) {
            todoLabel.classList.add("text_middle_line")
        }
        todoLabel.innerText = TODO.Value
        todoLabel.addEventListener("click",modifyTodoEvent.bind(this))

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
            result.push(new TODO_OBJECT(RAW_LIST[i]._id,RAW_LIST[i].DATA,RAW_LIST[i].CREATED_DATE,RAW_LIST[i].DEAD_LINE,RAW_LIST[i].IS_DONE))
        }
        return result;
    }

    /**
     * 특정 날짜의 TODO 값 가져오기
     * @param date : Date
     */
    TODO.prototype.getDateTodo =async function (date,isOthers,ID) {
        // 백엔드에서 요청해서 갖고 오기
        if(isOthers) {
            let result = await syncRequestFunction("GET","/todolist/target/daily?ID="+ID+"&date="+date.getTime(),null,"JSON")
            if(result.status) {
                this.printTodo(this.listConvertTodoObject(result.result))
            }
        }
        else {
            let result = await syncRequestFunction("GET","/todolist/my/daily?date="+date.getTime(),null,"JSON")
            if(result.status) {
                this.printTodo(this.listConvertTodoObject(result.result))
            }
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
            let todoID = event.target.parentNode.parentNode.querySelector(".completed_check_span").firstChild.id
            let afterText= event2.target.value
            requestFunction("PUT","/todolist/my/daily",{TODO_ID:todoID,TODO_DATA:{DATA:afterText}},"JSON",function (result){
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
            requestFunction("PUT","/todolist/my/daily",{TODO_ID:id,TODO_DATA:{DEAD_LINE:today}},"JSON",function (result) {
                if(result.status) {
                    currentTodo.parentNode.querySelector(".todo_date_limit_div").innerText = "오늘까지"
                    todoModify.remove()
                }
            })
        }

        function setTomorrowEvent(event) {
            let today = new Date()
            let tomorrowDay = new Date(today.getFullYear(),today.getMonth(),today.getDate()+1)
            let id = currentTodo.parentNode.parentNode.querySelector("input[type=checkbox]").getAttribute("id")
            requestFunction("PUT","/todolist/my/daily",{TODO_ID:id,TODO_DATA:{DEAD_LINE:tomorrowDay}},"JSON",function (result) {
                if(result.status) {
                    currentTodo.parentNode.querySelector(".todo_date_limit_div").innerText = "내일까지"
                    todoModify.remove()
                }
            })
        }

        function setDateTodoEvent(event) {
            let datepicker = new JH_datepicker(event.clientX,event.clientY,new Date())
            datepicker.getDay = function (day) {
                let id = currentTodo.parentNode.parentNode.querySelector("input[type=checkbox]").getAttribute("id")
                requestFunction("PUT","/todolist/my/daily",{TODO_ID:id,TODO_DATA:{DEAD_LINE:day}},"JSON",function (result) {
                    if(result.status) {
                        currentTodo.parentNode.querySelector(".todo_date_limit_div").innerText = Intl.DateTimeFormat("ko").format(day)+"까지"
                    }
                })
            }
        }

        function setCompletedTodoEvent(event) {
            // backend
            let check = currentTodo.parentNode.parentNode.querySelector("input[type=checkbox]")
            let flag = currentTodo.parentNode.parentNode.querySelector("input[type=checkbox]").checked
            let id = currentTodo.parentNode.parentNode.querySelector("input[type=checkbox]").getAttribute("id")
            requestFunction("PUT","/todolist/my/daily",{TODO_ID:id,TODO_DATA:{IS_DONE:!flag}},"JSON",function (result) {
                if(result.status) {
                    check.checked = !flag
                    if(flag) {
                        check.parentNode.parentNode.querySelector(".todo_label").classList.remove("text_middle_line")
                    }
                    else{
                        check.parentNode.parentNode.querySelector(".todo_label").classList.add("text_middle_line")
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
        requestFunction("PUT","/todolist/my/daily",{TODO_ID:id,TODO_DATA:{IS_DONE:!flag}},"JSON",function (result) {
            if(flag) {
                currentTarget.parentNode.parentNode.querySelector(".todo_label").classList.remove("text_middle_line")
            }
            else{
                currentTarget.parentNode.parentNode.querySelector(".todo_label").classList.add("text_middle_line")
            }
        })
    }

    function addTodoDeleteEvent(event) {
        if(prevTodoModify) {
            prevTodoModify.remove()
        }
        let id = event.currentTarget.parentNode.parentNode.querySelector("input[type=checkbox]").getAttribute("id")
        let current = event.currentTarget
        requestFunction("DELETE","/todolist/my/daily",{TODO_ID:id},"JSON",function (result) {
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

