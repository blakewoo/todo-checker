window.onload = function () {
    document.getElementById("headlineMyScheduleLabel").addEventListener("click",function (event) {
        location.href = location.protocol+"//"+location.host
    })
    document.getElementById("headlineTargetScheduleLabel").addEventListener("click",function (event) {
        location.href = location.protocol+"//"+location.host+"/target"
    })
    document.getElementById("headlineChattingLabel").addEventListener("click",function (event) {
        location.href = location.protocol+"//"+location.host+"/chatting"
    })
}