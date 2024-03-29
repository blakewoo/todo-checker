let headlineInit = require("./j_headline")
let publicFunction = require("./j_publicFunction")

window.onload = function(){
    headlineInit.headlineInit()
    initSchedule()

    document.getElementById("todoSharedRequestInputText").addEventListener("keyup",function (event) {
        if(event.key === "Enter") {
            document.getElementById("requestSubmitButton").click()
        }
    })

    document.getElementById("requestSubmitButton").addEventListener("click",function (event) {
        let targetId = document.getElementById("todoSharedRequestInputText").value
        publicFunction.requestFunction("POST","/todo-share/request",{target:targetId},"JSON",function (result){
            if(result.status){
                location.reload()
            }
            else {
                alert("해당 사용자가 없습니다.")
            }
        })
    })

    function initSchedule() {
        sharedRequestStatus(function (result) {
            printSharedRequestStatus(result)
        })


        sharedRequestReceiveStatus(function (result) {
            printSharedRequestReceiveStatus(result)
        })

    }

    function sharedRequestStatus(callback) {
        publicFunction.requestFunction("GET","/todo-share/request",{},"JSON",function (result){
            if(result.status){
                callback(result.result)
            }
            else {
                callback(false)
            }
        })
    }

    function sharedRequestReceiveStatus(callback) {
        publicFunction.requestFunction("GET","/todo-share/receive",{},"JSON",function (result){
            if(result.status){
                callback(result.result)
            }
            else {
                callback(false)
            }
        })
    }

    function requestDelete(id,callback) {
        publicFunction.requestFunction("DELETE","/todo-share/request",{target:id},"JSON",function (result){
            if(result.status){
                callback(true)
            }
            else {
                callback(false)
            }
        })
    }

    function printSharedRequestStatus(list){
        if(list.length===0) {
            return
        }

        let tbody = document.getElementById("sharedTodoRequestTbody")
        let temp = document.createDocumentFragment()

        for(let i=0;i<list.length;i++) {
            let tempTr = document.createElement("tr")
            tempTr.id = list[i]._id
            let tempId = document.createElement("td")
            tempId.innerText = list[i].TARGET_USER_ID

            let tempEmail = document.createElement("td")
            tempEmail.innerText = list[i].TARGET_EMAIL

            let tempCreated = document.createElement("td")
            tempCreated.innerText = Intl.DateTimeFormat("ko",{dateStyle: 'full', timeStyle: 'short'}).format(new Date(list[i].CREATED_DATE))

            let tempStatus = document.createElement("td")
            let tempCancelButton = document.createElement("input")
            tempCancelButton.type="button"
            if(list[i].STATUS ==="Waiting") {
                tempStatus.innerHTML = "대기중/"
                tempCancelButton.value = "취소"
            }
            else if(list[i].STATUS ==="ACCEPT") {
                tempStatus.innerText = "수락/"
                tempCancelButton.value = "취소"
            }
            else {
                tempStatus.innerText = "거절/"
                tempCancelButton.value = "삭제"
            }
            tempCancelButton.addEventListener("click",function (event){
                let deleteId = event.currentTarget.parentNode.parentNode.getAttribute("id")

                requestDelete(deleteId,function (result){
                    if(result) {
                        location.reload()
                    }
                })
            })
            tempStatus.appendChild(tempCancelButton)

            tempTr.appendChild(tempId)
            tempTr.appendChild(tempEmail)
            tempTr.appendChild(tempCreated)
            tempTr.appendChild(tempStatus)
            temp.appendChild(tempTr)
        }

        tbody.appendChild(temp)
    }

    function printSharedRequestReceiveStatus(list){
        if(list.length===0) {
            return
        }

        let tbody = document.getElementById("sharedTodoReceiveTbody")
        let temp = document.createDocumentFragment()

        for(let i=0;i<list.length;i++) {
            let tempTr = document.createElement("tr")
            tempTr.id = list[i]._id
            let tempId = document.createElement("td")
            tempId.innerText = list[i].OVERSEER_USER_ID

            let tempEmail = document.createElement("td")
            tempEmail.innerText = list[i].OVERSEER_EMAIL

            let tempCreated = document.createElement("td")
            tempCreated.innerText = Intl.DateTimeFormat("ko",{dateStyle: 'full', timeStyle: 'short'}).format(new Date(list[i].CREATED_DATE))

            let tempSubmit = document.createElement("td")
            let tempRemove = document.createElement("input")
            tempRemove.type = "button"
            if(list[i].STATUS ==="Waiting") {
                let submitButton = document.createElement("input")
                submitButton.type = "button"
                submitButton.value= "허용"
                submitButton.classList.add("receiveSubmmit_button")
                submitButton.id="submit_"+list[i].OVERSEER_USER_ID
                submitButton.addEventListener("click",function (event) {
                    publicFunction.requestFunction("PUT","/todo-share/receive",{requester:list[i].OVERSEER_USER_ID,state:"ACCEPT"},"JSON",function (result) {
                        if(result.status) {
                            location.reload()
                        }
                    })
                })

                let declineButton = document.createElement("input")
                declineButton.type = "button"
                declineButton.value= "거절"
                declineButton.classList.add("receiveDecline_button")
                declineButton.id="decline_"+list[i].OVERSEER_USER_ID
                declineButton.addEventListener("click",function (event) {
                    publicFunction.requestFunction("PUT","/todo-share/receive",{requester:list[i].OVERSEER_USER_ID,state:"DECLINE"},"JSON",function (result) {
                        if(result.status) {
                            location.reload()
                        }
                    })
                })
                tempSubmit.appendChild(submitButton)
                tempSubmit.appendChild(declineButton)
            }
            else if(list[i].STATUS ==="DECLINE") {
                tempSubmit.innerText = "거절/"
                tempRemove.value = "삭제"
                tempSubmit.appendChild(tempRemove)
            }
            else {
                tempSubmit.innerText = "수락 완료/"
                tempRemove.value = "취소"
                tempSubmit.appendChild(tempRemove)
            }
            tempRemove.addEventListener("click",function (event){
                let deleteId = event.currentTarget.parentNode.parentNode.getAttribute("id")
                requestDelete(deleteId,function (result){
                    if(result) {
                        location.reload()
                    }
                })
            })

            tempTr.appendChild(tempId)
            tempTr.appendChild(tempEmail)
            tempTr.appendChild(tempCreated)
            tempTr.appendChild(tempSubmit)
            temp.appendChild(tempTr)
        }

        tbody.appendChild(temp)
    }
}
