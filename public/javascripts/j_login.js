window.onload=function(){document.getElementById("idInputText").addEventListener("keyup",(function(e){"Enter"===e.key&&document.getElementById("loginButton").click()})),document.getElementById("passwordInput").addEventListener("keyup",(function(e){"Enter"===e.key&&(e.currentTarget.blur(),document.getElementById("loginButton").click())})),document.getElementById("loginButton").addEventListener("click",(function(e){let n=document.getElementById("idInputText").value,t=document.getElementById("passwordInput").value;publicFunction.requestFunction("POST","/login/verified-user",{ID:n,PASSWORD:t},"JSON",(function(e){e.status?location.reload():"ID_Unverified"===e.reason?publicFunction.okCancelModal("ID or Password is not verified",400,200,(function(e){e.addEventListener("click",(function(e){e.currentTarget.parentNode.remove()}))})):publicFunction.okCancelModal("Login error",400,100,(function(e){e.addEventListener("click",(function(e){e.currentTarget.parentNode.remove()}))}))}))})),document.getElementById("signupButton").addEventListener("click",(function(e){location.href=location.protocol+"//"+location.host+"/signup"}))};