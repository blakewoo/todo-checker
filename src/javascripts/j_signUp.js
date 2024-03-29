let publicFunction = require("./j_publicFunction")

window.onload = function () {
    document.getElementById("signupButton").addEventListener("click",function (event){
        let ID = document.getElementById("idInputText").value
        let PASSWORD = document.getElementById("passwordInput").value
        let EMAIL = document.getElementById("emailInputText").value
        let emailReg = new RegExp('[a-z0-9]+@[a-z]+\.[a-z]{2,3}');
        let passwordReg = /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{9,25}$/;

        if(!emailReg.test(EMAIL)) {
            publicFunction.okCancelModal("적절하지 않은 메일 형태입니다.",400,70,function (target) {
                target.addEventListener("click",function (event) {
                    event.currentTarget.parentNode.remove()
                })
            });
            return;
        }

        if(!passwordReg.test(PASSWORD)) {
            publicFunction.okCancelModal("비밀번호는 영문자,숫자,특수문자를 포함해서 9~25자리여야합니다.",400,100,function (target) {
                target.addEventListener("click",function (event) {
                    event.currentTarget.parentNode.remove()
                })
            });
            return;
        }


        publicFunction.requestFunction("POST","/user/my",{ID:ID,PASSWORD:PASSWORD,EMAIL:EMAIL},"JSON",function (result) {
            if(result.status) {
                location.href = location.protocol+"//"+location.host+"/"
            }
            else {
                if(result.reason==="ID_duplicated") {
                    publicFunction.okCancelModal("존재하는 아이디입니다.",400,200,function (target) {
                        target.addEventListener("click",function (event) {
                            event.currentTarget.parentNode.remove()
                        })
                    });
                }
                else if(result.reason==="EMAIL_duplicated"){
                    publicFunction.okCancelModal("존재하는 이메일입니다.",400,200,function (target) {
                        target.addEventListener("click",function (event) {
                            event.currentTarget.parentNode.remove()
                        })
                    });
                }
                else if(result.reason==="malformed email"){
                    publicFunction.okCancelModal("적절하지 않은 메일 형태입니다.",400,200,function (target) {
                        target.addEventListener("click",function (event) {
                            event.currentTarget.parentNode.remove()
                        })
                    });
                }
                else{
                    publicFunction.okCancelModal("회원가입간 문제가 발생했습니다.",400,200,function (target) {
                        target.addEventListener("click",function (event) {
                            event.currentTarget.parentNode.remove()
                        })
                    });
                }
            }
        })
    })

    document.getElementById("cancelButton").addEventListener("click",function (event) {
        location.href = location.protocol+"//"+location.host+"/"
    })
}