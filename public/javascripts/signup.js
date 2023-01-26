window.onload = function () {
    document.getElementById("signup_button").addEventListener("click",function (event){
        let ID = document.getElementById("ID_input").value
        let PASSWORD = document.getElementById("PASSWORD_input").value
        let EMAIL = document.getElementById("EMAIL_input").value

        requestFunction("POST","/signup",{ID:ID,PASSWORD:PASSWORD,EMAIL:EMAIL},"JSON",function (result) {
            if(result.status) {
                location.href = location.protocol+"//"+location.host+"/"
            }
            else {
                if(result.reason==="ID_duplicated") {
                    okCancelModal("존재하는 아이디입니다.",400,200,function (target) {
                        target.addEventListener("click",function (event) {
                            event.currentTarget.parentNode.remove()
                        })
                    });
                }
                else if(result.reason==="EMAIL_duplicated"){
                    okCancelModal("존재하는 이메일입니다.",400,200,function (target) {
                        target.addEventListener("click",function (event) {
                            event.currentTarget.parentNode.remove()
                        })
                    });
                }
                else{
                    okCancelModal("회원가입간 문제가 발생했습니다.",400,200,function (target) {
                        target.addEventListener("click",function (event) {
                            event.currentTarget.parentNode.remove()
                        })
                    });
                }
            }
        })
    })

    document.getElementById("cancel_button").addEventListener("click",function (event) {
        location.href = location.protocol+"//"+location.host+"/"
    })
}