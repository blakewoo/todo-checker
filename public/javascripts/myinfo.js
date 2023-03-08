window.onload = function () {

    headlineInit()
    let passwordDifferentFlag = false
    requestFunction("GET","/user/my",null,"JSON",function (result) {
        let emailInput = document.getElementById("email_modify_input")
        emailInput.value = result.result.EMAIL


        document.getElementsByClassName("myinfo_delete_account_div")[0].addEventListener("click",function (event) {
            // delete account function
            yesNoModal("정말로 탈퇴 하시겠습니까?",300,50,function (yesButton,noButton) {
                yesButton.addEventListener("click",function (event) {
                    requestFunction("DELETE","/user/my",{},"JSON",function (result){
                        if(result.status) {
                            location.href = location.protocol+"//"+location.host
                        }
                    })
                    event.currentTarget.parentNode.remove()
                })

                noButton.addEventListener("click",function (event) {
                    event.currentTarget.parentNode.remove()
                })
            })
        })

        document.getElementById("password_input").addEventListener("keyup",function (event) {
            let pass = document.getElementById("password_input").value
            let passConfirm = document.getElementById("password_confirm_input").value
            samePassword(pass,passConfirm,document.getElementById("myinfoModifySubmitButton"))
        })
        document.getElementById("password_confirm_input").addEventListener("keyup",function (event) {
            let pass = document.getElementById("password_input").value
            let passConfirm = document.getElementById("password_confirm_input").value
            samePassword(pass,passConfirm,document.getElementById("myinfoModifySubmitButton"))
        })

        document.getElementById("myinfoModifySubmitButton").addEventListener("click",function (event) {
            let data = {}
            data.EMAIL = document.getElementById("email_modify_input").value
            data.PASSWORD = document.getElementById("password_input").value
            data.PASSWORD_CONFIRM = document.getElementById("password_confirm_input").value
            let passwordReg = /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{9,25}$/;


            if(passwordDifferentFlag) {
                okCancelModal("비밀번호와 비밀번호 확인 란의 입력값이 다릅니다.",400,100,function (target) {
                    target.addEventListener("click",function (event) {
                        event.currentTarget.parentNode.remove()
                    })
                });
                return;
            }

            if(data.PASSWORD!=="" && !passwordReg.test(data.PASSWORD)) {
                okCancelModal("비밀번호는 영문자,숫자,특수문자를 포함해서 9~25자리여야합니다.",400,100,function (target) {
                    target.addEventListener("click",function (event) {
                        event.currentTarget.parentNode.remove()
                    })
                });
                return;
            }

            let emailReg = new RegExp('[a-z0-9]+@[a-z]+\.[a-z]{2,3}');
            if(!emailReg.test(data.EMAIL)) {
                okCancelModal("적절하지 않은 메일 형태입니다.",400,100,function (target) {
                    target.addEventListener("click",function (event) {
                        event.currentTarget.parentNode.remove()
                    })
                });
                return;
            }

            requestFunction("PUT","/user/my",data,"JSON",function (result) {
                if(result.status) {
                    okCancelModal("UPDATE COMPLETE",400,100,function (target) {
                        target.addEventListener("click",function (event) {
                            event.currentTarget.parentNode.remove()
                        })
                    });
                    document.getElementById("password_input").value = ""
                    document.getElementById("password_confirm_input").value = ""
                }
                else {
                    let reasonMessage = result.reason;

                    // language pack

                    okCancelModal(reasonMessage,400,100,function (target) {
                        target.addEventListener("click",function (event) {
                            event.currentTarget.parentNode.remove()
                        })
                    });
                }
            })
        })
    })

    function samePassword(pass,passConfirm,targetButton) {
        if(pass === passConfirm) {
            targetButton.disabled = false
            passwordDifferentFlag = false
        }
        else {
            targetButton.disabled = true
            passwordDifferentFlag = true
        }
    }
}