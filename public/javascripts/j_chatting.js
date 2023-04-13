window.onload = async function (event) {
    headlineInit()
    const socket = io();
    await initShared()
    requestFunction("GET","/user/my",{},"JSON",function (result) {
        if(result.status) {
            socket.emit("access", {ID:result.result.ID});
        }
    })

    socket.on('chat', function(data) {
        let targetSelect = document.getElementById("sharedChatSelect")
        let targetId = targetSelect.options[targetSelect.selectedIndex].text
        document.getElementById("textDisplayDiv").innerText += targetId+" : "+data + "\n"
    });

    // Chatting with your viewer
    document.getElementById("messageSendButton").addEventListener("click",sendMessage)
    document.getElementById("chattingTextInput").addEventListener("keyup",enterSendMessage)

    function enterSendMessage(event) {
        if(event.key==="Enter") {
            document.getElementById("messageSendButton").click()
        }
    }

    function sendMessage(event) {
        let text = document.getElementById("chattingTextInput").value
        //backend update

        //socket connect
        let targetSelect = document.getElementById("sharedChatSelect")
        let targetId = targetSelect.options[targetSelect.selectedIndex].text
        socket.emit("chat",{message:text,target:targetId})
        //front update
        document.getElementById("textDisplayDiv").innerText += "나 : "+text + "\n"
        document.getElementById("chattingTextInput").value = ""
    }

    async function initShared() {
        return new Promise((resolve,reject) => (
            requestFunction("GET","/todo-share/chatlist",{},"JSON",function (result) {
                if(result.status) {
                    let container = document.getElementById("sharedChatSelect")
                    if(result.result.length!==0) {
                        let temp = document.createDocumentFragment()
                        for(let i=0;i<result.result.length;i++) {
                            let tempOption = document.createElement("option")
                            if(result.myId === result.result[i].TARGET_USER_ID) {
                                tempOption.innerText = result.result[i].OVERSEER_USER_ID;
                            }
                            else{
                                tempOption.innerText = result.result[i].TARGET_USER_ID;
                            }
                            temp.appendChild(tempOption)
                        }
                        container.append(temp)
                    }
                    resolve(true)
                }
                else{
                    reject(true)
                }
            })
        ))
    }
}