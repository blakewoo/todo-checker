exports.headlineInit = function () {
    document.getElementById("headlineMyScheduleLabel").addEventListener("click",function (event) {
        location.href = location.protocol+"//"+location.host
    })
    document.getElementById("headlineTargetScheduleLabel").addEventListener("click",function (event) {
        location.href = location.protocol+"//"+location.host+"/target"
    })
    document.getElementById("headlineChattingLabel").addEventListener("click",function (event) {
        location.href = location.protocol+"//"+location.host+"/chatting"
    })
    document.getElementsByTagName("body")[0].addEventListener("click",function (e) {
        if(document.getElementsByClassName("myinfo_modal_div")[0] && !e.currentTarget.classList.contains("myinfo_modal_div")) {
            document.getElementsByClassName("myinfo_modal_div")[0].remove()
        }
    })

    document.getElementById("myInfoLabel").addEventListener("click",myInfoModalEvent)

    function myInfoModalEvent(event) {
        event.stopPropagation()
        myInfoModal(event.clientX, event.clientY,function (logoutDiv,shareDiv,myinfoDiv) {
            logoutDiv.addEventListener("click",function (event2) {
                location.href=location.protocol+"//"+location.host+"/logout"
            })

            shareDiv.addEventListener("click",function (event3){
                location.href=location.protocol+"//"+location.host+"/schedule_setting"
            })

            myinfoDiv.addEventListener("click",function (event4) {
                location.href=location.protocol+"//"+location.host+"/myinfo"
            })
        })
    }

    function myInfoModal(x, y, callback) {
        let html = document.getElementsByTagName("html")[0]

        let toastMessageDiv = document.createElement("div")
        toastMessageDiv.classList.add("myinfo_modal_div")
        toastMessageDiv.style.position = "absolute"
        toastMessageDiv.style.width = "100px"
        toastMessageDiv.style.height = "70px"
        toastMessageDiv.style.top = y + "px"
        toastMessageDiv.style.left = x - 100 + "px"
        toastMessageDiv.style.border = "#000000 1px solid"
        toastMessageDiv.style.background = "white"

        let myinfoDiv = document.createElement("div")
        myinfoDiv.innerText = "내 정보"
        myinfoDiv.classList.add("myinfo_myinfo_div")

        let shareDiv = document.createElement("div")
        shareDiv.innerText = "일정 공유"
        shareDiv.classList.add("myinfo_shared_div")

        let logoutDiv = document.createElement("div")
        logoutDiv.innerText = "로그아웃"
        logoutDiv.classList.add("myinfo_logout_div")

        toastMessageDiv.appendChild(myinfoDiv)
        toastMessageDiv.appendChild(shareDiv)
        toastMessageDiv.appendChild(logoutDiv)
        html.appendChild(toastMessageDiv)

        return callback(logoutDiv,shareDiv,myinfoDiv)
    }
}