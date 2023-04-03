window.onload = function(){
    headlineInit()
    initSchedule()

    document.getElementById("todoSharedRequest").addEventListener("keyup",function (event) {
        if(event.key === "Enter") {
            document.getElementById("requestSubmit").click()
        }
    })

    document.getElementById("requestSubmit").addEventListener("click",function (event) {
        let targetId = document.getElementById("todoSharedRequest").value
        requestFunction("POST","/todo-share/request",{target:targetId},"JSON",function (result){
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
        requestFunction("GET","/todo-share/request",{},"JSON",function (result){
            if(result.status){
                callback(result.result)
            }
            else {
                callback(false)
            }
        })
    }

    function sharedRequestReceiveStatus(callback) {
        requestFunction("GET","/todo-share/receive",{},"JSON",function (result){
            if(result.status){
                callback(result.result)
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

        let tbody = document.getElementById("shared_todo_request_tbody")
        let temp = document.createDocumentFragment()

        for(let i=0;i<list.length;i++) {
            let tempTr = document.createElement("tr")
            let tempId = document.createElement("td")
            tempId.innerText = list[i].TARGET_USER_ID

            let tempEmail = document.createElement("td")
            tempEmail.innerText = list[i].TARGET_EMAIL

            let tempCreated = document.createElement("td")
            tempCreated.innerText = Intl.DateTimeFormat("ko",{dateStyle: 'full', timeStyle: 'short'}).format(new Date(list[i].CREATED_DATE))

            let tempStatus = document.createElement("td")
            tempStatus.innerText = list[i].STATUS

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

        let tbody = document.getElementById("shared_todo_receive_tbody")
        let temp = document.createDocumentFragment()

        for(let i=0;i<list.length;i++) {
            let tempTr = document.createElement("tr")
            let tempId = document.createElement("td")
            tempId.innerText = list[i].OVERSEER_USER_ID

            let tempEmail = document.createElement("td")
            tempEmail.innerText = list[i].OVERSEER_EMAIL

            let tempCreated = document.createElement("td")
            tempCreated.innerText = list[i].CREATED_DATE

            let tempSubmit = document.createElement("td")
            tempCreated.innerHTML = "<input type='button' value='허용' class='receive_submmit_button' id='submit_'"+list[i].OVERSEER_USER_ID+">"

            tempTr.appendChild(tempId)
            tempTr.appendChild(tempEmail)
            tempTr.appendChild(tempCreated)
            tempTr.appendChild(tempSubmit)
            temp.appendChild(tempTr)
        }

        tbody.appendChild(temp)
    }
}
