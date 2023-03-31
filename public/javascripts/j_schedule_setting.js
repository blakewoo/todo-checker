window.onload = function(){
    headlineInit()
    initSchedule()

    function initSchedule() {
        let requestList = sharedRequestStatus()
        printSharedRequestStatus(requestList)

        let receiveList = sharedRequestReceiveStatus()
        printSharedRequestReceiveStatus(receiveList)
    }

    function sharedRequestStatus() {
        requestFunction("GET","/",{},"JSON",function (result){

        })
    }

    function sharedRequestReceiveStatus() {
        requestFunction("GET","/",{},"JSON",function (result){

        })
    }

    function printSharedRequestStatus(list){

    }

    function printSharedRequestReceiveStatus(list){

    }
}
