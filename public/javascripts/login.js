window.onload = function () {
    document.getElementById("login_button").addEventListener("click",function (event){
        let ID = document.getElementById("idInput").value
        let PASSWORD = document.getElementById("passwordInput").value

        requestFunction("POST","/login",{ID:ID,PASSWORD:PASSWORD},function (result) {
            location.reload()
        })
    })
}