window.onload = async function(){
    headlineInit()
    await initSchedule()

    async function initSchedule() {
        let requestList = await sharedRequestStatus()
        printSharedRequestStatus(requestList)

        let receiveList = await sharedRequestReceiveStatus()
        printSharedRequestReceiveStatus(receiveList)
    }

    async function sharedRequestStatus() {
        return new Promise((reject,resolve)=>{
            requestFunction("GET","/todo-share/request",{},"JSON",function (result){
                if(result.status){
                    resolve(result.result)
                }
                else {
                    reject(false)
                }
            })
        })
    }

    async function sharedRequestReceiveStatus() {
        return new Promise((reject,resolve)=>{
            requestFunction("GET","/todo-share/receive",{},"JSON",function (result){
                if(result.status){
                    resolve(result.result)
                }
                else {
                    reject(false)
                }
            })
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
            tempCreated.innerText = list[i].CREATED_DATE

            tempTr.appendChild(tempId)
            tempTr.appendChild(tempEmail)
            tempTr.appendChild(tempCreated)
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

            tempTr.appendChild(tempId)
            tempTr.appendChild(tempEmail)
            tempTr.appendChild(tempCreated)
            temp.appendChild(tempTr)
        }

        tbody.appendChild(temp)
    }
}
