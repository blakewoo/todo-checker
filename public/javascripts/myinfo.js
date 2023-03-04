window.onload = function () {
    let passwordDifferentFlag = true
    requestFunction("GET","/user/my",null,"JSON",function (result) {
        let emailInput = document.getElementById("email_modify_input")
        emailInput.value = result.result.EMAIL

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

            if(passwordDifferentFlag) {
                // need a alert
                return;
            }

            let emailReg = new RegExp('[a-z0-9]+@[a-z]+\.[a-z]{2,3}');
            if(!emailReg.test(data.EMAIL)) {
                return;
            }

            requestFunction("PUT","/user/my",data,"JSON",function (result) {
                if(result.result) {
                    // 성공
                    location.reload()
                }
                else {
                    // 실패
                }
            })
        })
    })

    function samePassword(pass,passConfirm,targetButton) {
        if(pass === passConfirm) {
            targetButton.disable = false
            passwordDifferentFlag = false
        }
        else {
            targetButton.disable = true
            passwordDifferentFlag = true
        }
    }
}