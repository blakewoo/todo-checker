window.onload = function (event) {
    headlineInit()
    // Chatting with your viewer
    document.getElementById("messageSendButton").addEventListener("click",sendMessage)
    document.getElementById("chattingTextarea").addEventListener("keyup",enterSendMessage)

    function enterSendMessage(event) {
        if(event.key==="Enter") {
            document.getElementById("messageSendButton").click()
        }
    }

    function sendMessage(event) {
        let text = document.getElementById("chattingTextarea").value
        //backend update

        //socket connect

        //front update
        document.getElementById("textDisplayDiv").innerText += "나 : "+text + "\n"
        document.getElementById("chattingTextarea").value = ""
    }
}