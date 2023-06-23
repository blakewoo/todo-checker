function requestFunction(method_type,url,send_data,responseType="JSON",callback) {
    let xhr = new XMLHttpRequest();

    xhr.onreadystatechange = function () {
        if(xhr.readyState === xhr.DONE) {
            if (xhr.status === 200 || xhr.status === 201) {
                if(responseType==="JSON") {
                    callback(JSON.parse(xhr.responseText));
                }
                else{
                    callback(xhr.responseText);
                }
            }
            else {
                console.error(xhr.responseText);
                callback(null,xhr.responseText)
            }
        }
    }

    let sender = send_data;

    if(method_type==="GET") {
        xhr.open(method_type,url);
        xhr.send();
    }
    else {
        xhr.open(method_type,url);
        xhr.setRequestHeader('Content-Type', "application/json");
        xhr.send(JSON.stringify(sender));
    }
}

async function syncRequestFunction(method_type,url,send_data,responseType) {
    return new Promise((resolve,reject)=>{
        requestFunction(method_type,url,send_data,responseType,function (result,error) {
            if(error) {
                reject(result)
            }
            else {
                resolve(result)
            }
        })
    })
}


function okCancelModal(message,width=400,height=200,callback) {
    let html = document.getElementsByTagName("html")[0]

    let toastMessageDiv = document.createElement("div")
    toastMessageDiv.style.position = "absolute"
    toastMessageDiv.style.width =width+"px"
    toastMessageDiv.style.height =height+"px"
    toastMessageDiv.style.top = "calc(50% - "+height/2+"px)"
    toastMessageDiv.style.left = "calc(50% - "+width/2+"px)"
    toastMessageDiv.style.border = "#ffffff 1px solid"
    toastMessageDiv.style.background = "#591902"
    toastMessageDiv.style.textAlign = "center"

    let titleDiv = document.createElement("div")

    let title = document.createElement("label")
    title.innerText=message
    title.style.fontSize="15pt"
    title.style.color = "white"
    titleDiv.appendChild(title)

    let okButton = document.createElement("input")
    okButton.type="button"
    okButton.value="OK"
    okButton.id="okThisButton"
    okButton.classList.add("public_button")

    let cancelButton = document.createElement("input")
    cancelButton.type="button"
    cancelButton.value="Cancel"
    cancelButton.id="cancelThisButton"
    cancelButton.classList.add("public_button")

    toastMessageDiv.appendChild(titleDiv)
    toastMessageDiv.appendChild(okButton)
    toastMessageDiv.appendChild(cancelButton)
    html.appendChild(toastMessageDiv)

    cancelButton.addEventListener("click",function (event) {
        event.currentTarget.parentNode.remove();
    })

    return callback(okButton)
}

function yesNoModal(message,width=400,height=200,callback) {
    let html = document.getElementsByTagName("html")[0]

    let toastMessageDiv = document.createElement("div")
    toastMessageDiv.style.position = "absolute"
    toastMessageDiv.style.width =width+"px"
    toastMessageDiv.style.height =height+"px"
    toastMessageDiv.style.top = "calc(50% - "+height/2+"px)"
    toastMessageDiv.style.left = "calc(50% - "+width/2+"px)"
    toastMessageDiv.style.border = "black 1px solid"
    toastMessageDiv.style.background = "white"
    toastMessageDiv.style.textAlign = "center"

    let title = document.createElement("h2")
    title.innerText=message
    let yesButton = document.createElement("input")
    yesButton.type="button"
    yesButton.value="YES"
    yesButton.id="yesThisButton"

    let noButton = document.createElement("input")
    noButton.type="button"
    noButton.value="NO"
    noButton.id="noThisButton"

    toastMessageDiv.appendChild(title)
    toastMessageDiv.appendChild(yesButton)
    toastMessageDiv.appendChild(noButton)
    html.appendChild(toastMessageDiv)

    return callback(yesButton,noButton)
}
