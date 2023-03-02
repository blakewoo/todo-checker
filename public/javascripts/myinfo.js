window.onload = function () {
    let passwordDifferentFlag = true
    requestFunction("GET","/user/my",null,"JSON",function (result) {
        let emailInput = document.getElementById("email_modify_input")
        emailInput.value = result.result.EMAIL

        document.getElementById("myinfoModifySubmitButton").addEventListener("click",function (event) {
            if(passwordDifferentFlag) {
                // need a alert
                return;
            }

            let data = {}
            requestFunction("PUT","/user/my",data,"JSON",function (result) {

            })
        })
    })
}