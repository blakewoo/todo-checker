window.onload = async function (event) {
    let calendar = new JH_calendar(document.getElementById("calendar_div"), new Date())
    let todoObj = await initTodo()


    document.getElementById("todo_input").addEventListener("keyup", todoInputEvent)
    document.getElementById("myinfo_label").addEventListener("click",myInfoModalEvent)

    async function initTodo() {
        return new Promise((resolve,reject) => (
            // requestFunction("GET","/todolist/my?date="+(new Date().getDate()),{},"JSON",function (result) {
            //     resolve(new TODO(result.result,document.getElementById("todo_container_div")))
            resolve(new TODO([],document.getElementById("todo_container_div")))
            // })
        ))
    }

    function todoInputEvent(event) {
        if (event.key === "Enter") {
            let Data = event.currentTarget.value

            if (Data === "") {
                return
            }
            event.currentTarget.value = ""
            let temp = new TODO_OBJECT(Data,null,false)
            todoObj.addTodo(temp)
        }
    }

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