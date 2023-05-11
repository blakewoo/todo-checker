window.onload = function () {
    document.getElementById("idInputText").addEventListener("keyup",function (event) {
        if(event.key === "Enter") {
            document.getElementById("loginButton").click()
        }
    })

    document.getElementById("passwordInput").addEventListener("keyup",function (event) {
        if(event.key === "Enter") {
            event.currentTarget.blur()
            document.getElementById("loginButton").click()
        }
    })

    document.getElementById("loginButton").addEventListener("click",function (event){
        let ID = document.getElementById("idInputText").value
        let PASSWORD = document.getElementById("passwordInput").value

        requestFunction("POST","/login/verified-user",{ID:ID,PASSWORD:PASSWORD},"JSON",function (result) {
            if(result.status) {
                location.reload()
            }
            else {
                if(result.reason==="ID_Unverified") {
                    okCancelModal("ID or Password is not verified",400,200,function (target) {
                        target.addEventListener("click",function (event) {
                            event.currentTarget.parentNode.remove()
                        })
                    });
                }
                else {
                    okCancelModal("Login error",400,100,function (target) {
                        target.addEventListener("click",function (event) {
                            event.currentTarget.parentNode.remove()
                        })
                    });
                }
            }
        })
    })

    document.getElementById("signupButton").addEventListener("click",function (event) {
        location.href = location.protocol+"//"+location.host+"/signup"
    })
}