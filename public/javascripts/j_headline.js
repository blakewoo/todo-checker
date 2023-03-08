function headlineInit() {
    document.getElementById("headlineMyScheduleLabel").addEventListener("click",function (event) {
        location.href = location.protocol+"//"+location.host
    })
    document.getElementById("headlineTargetScheduleLabel").addEventListener("click",function (event) {
        location.href = location.protocol+"//"+location.host+"/target"
    })
    document.getElementById("headlineChattingLabel").addEventListener("click",function (event) {
        location.href = location.protocol+"//"+location.host+"/chatting"
    })

    document.getElementById("myinfo_label").addEventListener("click",myInfoModalEvent)

    function myInfoModalEvent(event) {
        myInfoModal(event.clientX, event.clientY,function (logoutDiv,myinfoDiv,deleteDiv,container) {
            logoutDiv.addEventListener("click",function (event2) {
                location.href=location.protocol+"//"+location.host+"/logout"
            })

            myinfoDiv.addEventListener("click",function (event3) {
                location.href=location.protocol+"//"+location.host+"/myinfo"
            })

            deleteDiv.addEventListener("click",function (event4) {
                container.remove()
            })
        })
    }

    function myInfoModal(x, y, callback) {
        let html = document.getElementsByTagName("html")[0]

        let toastMessageDiv = document.createElement("div")
        toastMessageDiv.style.position = "absolute"
        toastMessageDiv.style.width = "100px"
        toastMessageDiv.style.height = "60px"
        toastMessageDiv.style.top = y + "px"
        toastMessageDiv.style.left = x - 100 + "px"
        toastMessageDiv.style.border = "#000000 1px solid"
        toastMessageDiv.style.background = "white"

        let logoutDiv = document.createElement("div")
        logoutDiv.innerText = "로그아웃"
        logoutDiv.classList.add("myinfo_logout_div")

        let myinfoDiv = document.createElement("div")
        myinfoDiv.innerText = "내 정보"
        myinfoDiv.classList.add("myinfo_myinfo_div")

        let deleteDiv = document.createElement("div")
        deleteDiv.innerText = "취소"
        deleteDiv.classList.add("myinfo_cancel_div")

        toastMessageDiv.appendChild(logoutDiv)
        toastMessageDiv.appendChild(myinfoDiv)
        toastMessageDiv.appendChild(deleteDiv)
        html.appendChild(toastMessageDiv)

        return callback(logoutDiv,myinfoDiv, deleteDiv,toastMessageDiv)
    }
}