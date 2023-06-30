let headlineInit = require("./j_headline")
let publicFunction = require("./j_publicFunction")

window.onload = async function (event) {
    headlineInit.headlineInit()
    let myId = ""
    const socket = io();
    await initShared();
    await getMessage();

    publicFunction.requestFunction("GET","/user/my",{},"JSON",function (result) {
        if(result.status) {
            socket.emit("access", {ID:result.result.ID});
        }
    })

    socket.on('chat', function(data) {
        let targetSelect = document.getElementById("sharedChatSelect")
        if(targetSelect.selectedIndex !== -1) {
            let targetId = targetSelect.options[targetSelect.selectedIndex].text
            document.getElementById("textDisplayDiv").innerText += targetId+" ["+new Intl.DateTimeFormat("ko", { timeStyle: 'short' }).format(new Date())+"] : "+data + "\n"
        }
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
        let targetSelect = document.getElementById("sharedChatSelect")
        if(targetSelect.selectedIndex !== -1) {
            let targetId = targetSelect.options[targetSelect.selectedIndex].text
            //backend update
            if(document.getElementById("chattingTextInput").value === "") {
                publicFunction.okCancelModal("전송할 내용을 입력해주세요.",400,60,function (target) {
                    target.addEventListener("click",function (event) {
                        event.currentTarget.parentNode.remove()
                    })
                });
                return;
            }

            publicFunction.requestFunction("POST","/chatting/my",{targetId:targetId,message:text},"JSON",function (result) {
                if(result.status) {
                    //socket connect
                    socket.emit("chat",{message:text,target:targetId})
                    //front update
                    document.getElementById("textDisplayDiv").innerText += "나 ["+new Intl.DateTimeFormat("ko", { timeStyle: 'short' }).format(new Date())+"] : "+text + "\n"
                    document.getElementById("chattingTextInput").value = ""

                    let tempTextarea = document.getElementById('textDisplayDiv');
                    tempTextarea.scrollTop = tempTextarea.scrollHeight;
                }
            })
        }
        else {
            publicFunction.okCancelModal("일정 공유하는 사람이 있어야\n 채팅이 가능합니다.",400,90,function (target) {
                target.addEventListener("click",function (event) {
                    event.currentTarget.parentNode.remove()
                })
            });
        }
    }

    async function getMessage() {
        let targetSelect = document.getElementById("sharedChatSelect")
        if(targetSelect.selectedIndex === -1) {
            return;
        }
        let targetId = targetSelect.options[targetSelect.selectedIndex].text
        return new Promise((resolve,reject) => (
            publicFunction.requestFunction("GET","/chatting/my?targetId="+targetId,{},"JSON",function (result) {
                if(result.status) {
                    let chatData = result.result;
                    let str = ""
                    let timeCheck = null
                    for(let i=0;i<chatData.length;i++){

                        if(timeCheck===null) {
                            str += new Intl.DateTimeFormat("ko", { dateStyle: 'short' }).format(new Date(chatData[i].CREATED)) + "\n\n\n"
                            timeCheck = new Intl.DateTimeFormat("ko", { dateStyle: 'short' }).format(new Date(chatData[i].CREATED))
                        }
                        else if(timeCheck !== new Intl.DateTimeFormat("ko", { dateStyle: 'short' }).format(new Date(chatData[i].CREATED))) {
                            str +=  "\n\n"+new Intl.DateTimeFormat("ko", { dateStyle: 'short' }).format(new Date(chatData[i].CREATED)) + "\n\n\n"
                            timeCheck = new Intl.DateTimeFormat("ko", { dateStyle: 'short' }).format(new Date(chatData[i].CREATED))
                        }

                        if(chatData[i].REQUEST_ID === myId) {
                            str += "나 ["+new Intl.DateTimeFormat("ko", { timeStyle: 'short' }).format(new Date(chatData[i].CREATED))+"]  : "+chatData[i].MESSAGE + "\n"
                        }
                        else {
                            str += chatData[i].DESTINATION_ID + " ["+new Intl.DateTimeFormat("ko", { timeStyle: 'short' }).format(new Date(chatData[i].CREATED))+"] :  " + chatData[i].MESSAGE + "\n"
                        }
                    }
                    document.getElementById("textDisplayDiv").innerText = str
                    let tempTextarea = document.getElementById('textDisplayDiv');
                    tempTextarea.scrollTop = tempTextarea.scrollHeight;
                    resolve(true)
                }
                else{
                    reject(true)
                }
            })
        ))
    }

    async function initShared() {
        return new Promise((resolve,reject) => (
            publicFunction.requestFunction("GET","/todo-share/chatlist",{},"JSON",function (result) {
                if(result.status) {
                    let container = document.getElementById("sharedChatSelect")
                    if(result.result.length!==0) {
                        myId = result.myId
                        let temp = document.createDocumentFragment()
                        for(let i=0;i<result.result.length;i++) {
                            let tempOption = document.createElement("option")
                            if(myId === result.result[i].TARGET_USER_ID) {
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