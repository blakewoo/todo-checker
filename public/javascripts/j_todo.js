(()=>{"use strict";!function(){function n(e,t,o,n){let d=new Map;for(let t=0;t<e.length;t++)d.set(e[t].ID,e[t].DATA);this.TODO_CONTAINER=t,this.READ_ONLY=o,this.TYPE=n,this.printTodo(e),document.getElementsByTagName("body")[0].addEventListener("click",(function(e){!document.getElementsByClassName("todo_modify_div")[0]||e.target.classList.contains("todo_modify_div")||e.target.classList.contains("jh_datepicker_div_table_thead_prev")||e.target.classList.contains("jh_datepicker_div_table_thead_after")||document.getElementsByClassName("todo_modify_div")[0].remove()}))}function d(e){if(this.READ_ONLY)return;let t=e.currentTarget,o=t.innerText;e.currentTarget.style.display="none";let n=document.createElement("textarea");n.innerText=o,n.classList.add("modify_textarea"),n.addEventListener("focusout",function(o){let n=e.target.parentNode.parentNode.querySelector(".completedCheck_span").firstChild.id,d=o.target.value;requestFunction("PUT","/todolist/my/daily",{TODO_ID:n,TODO_DATA:{DATA:d}},"JSON",(function(e){e.status&&(t.innerText=o.target.value,t.style.display="",o.target.remove())}))}.bind(this)),t.parentNode.insertBefore(n,t.parentNode.firstChild),n.focus()}function i(o){o.stopPropagation();let n=o.currentTarget;function d(t){let o=new Date((new Date).setHours(0,0,0,0)),d=n.parentNode.parentNode.querySelector("input[type=checkbox]").getAttribute("id");requestFunction("PUT","/todolist/my/daily",{TODO_ID:d,TODO_DATA:{DEAD_LINE:o}},"JSON",(function(t){t.status&&(n.parentNode.querySelector(".todoDateLimit_div").innerText="오늘까지",e.remove())}))}function i(t){let o=new Date,d=new Date(o.getFullYear(),o.getMonth(),o.getDate()+1),i=n.parentNode.parentNode.querySelector("input[type=checkbox]").getAttribute("id");requestFunction("PUT","/todolist/my/daily",{TODO_ID:i,TODO_DATA:{DEAD_LINE:d}},"JSON",(function(t){t.status&&(n.parentNode.querySelector(".todoDateLimit_div").innerText="내일까지",e.remove())}))}function a(e){new JH_datepicker(e.clientX,e.clientY,new Date).getDay=function(e){let t=n.parentNode.parentNode.querySelector("input[type=checkbox]").getAttribute("id");requestFunction("PUT","/todolist/my/daily",{TODO_ID:t,TODO_DATA:{DEAD_LINE:e}},"JSON",(function(t){t.status&&(n.parentNode.querySelector(".todoDateLimit_div").innerText=Intl.DateTimeFormat("ko").format(e)+"까지")}))}}function l(t){let o=n.parentNode.parentNode.querySelector("input[type=checkbox]"),d=n.parentNode.parentNode.querySelector("input[type=checkbox]").checked,i=n.parentNode.parentNode.querySelector("input[type=checkbox]").getAttribute("id");requestFunction("PUT","/todolist/my/daily",{TODO_ID:i,TODO_DATA:{IS_DONE:!d}},"JSON",(function(e){e.status&&(o.checked=!d,d?o.parentNode.parentNode.querySelector(".todo_label").classList.remove("todoTextMiddleLine_label"):o.parentNode.parentNode.querySelector(".todo_label").classList.add("todoTextMiddleLine_label"))})),e.remove()}t&&t.remove(),function(o,n,r){let s=document.getElementsByTagName("html")[0],c=document.createElement("div");c.classList.add("todo_modify_div"),c.style.position="absolute",c.style.width="100px",c.style.height="60px",c.style.top=n+"px",c.style.left=o-100+"px",c.style.border="#000000 1px solid",c.style.background="white";let u=document.createElement("div");u.innerText="오늘까지",u.classList.add("todoModifyDetail_div");let p=document.createElement("div");p.innerText="다음날까지",p.classList.add("todoModifyDetail_div");let T=document.createElement("div");T.innerText="날짜 선택",T.classList.add("todoModifyDetail_div");let y=document.createElement("div");y.innerText="완료/미완료 전환",y.classList.add("todoModifyDetail_div"),c.appendChild(u),c.appendChild(p),c.appendChild(T),c.appendChild(y),s.appendChild(c),function(o,n,r,s,c){e=c,t=c,o.addEventListener("click",d),n.addEventListener("click",i),r.addEventListener("click",a),s.addEventListener("click",l)}(u,p,T,y,c)}(o.clientX,o.clientY)}function a(e){let t=e.currentTarget,o=e.currentTarget.parentNode.querySelector("input[type=checkbox]").getAttribute("id"),n=e.currentTarget.parentNode.querySelector("input[type=checkbox]").checked;requestFunction("PUT","/todolist/my/daily",{TODO_ID:o,TODO_DATA:{IS_DONE:!n}},"JSON",(function(e){n?t.parentNode.parentNode.querySelector(".todo_label").classList.remove("todoTextMiddleLine_label"):t.parentNode.parentNode.querySelector(".todo_label").classList.add("todoTextMiddleLine_label")}))}function l(e){t&&t.remove();let o=e.currentTarget.parentNode.parentNode.querySelector("input[type=checkbox]").getAttribute("id"),n=e.currentTarget;requestFunction("DELETE","/todolist/my/daily",{TODO_ID:o},"JSON",(function(e){e.status&&n.parentNode.parentNode.remove()}))}n.prototype.printTodo=function(e){this.TODO_CONTAINER.innerHTML="";for(let t=0;t<e.length;t++)this.addFrontTodo(e[t])},n.prototype.addTodo=async function(e,t,o){if(!e.Value)return!1;if(this.READ_ONLY)return!1;let n={CREATED_DATE:new Date,TARGET_DATE:t,DATA:e.Value},d=await this.addBackTodo(n,o);return!!d&&(e.DeadLine=null,e.IS_DONE=!1,e.ID=d.result._id,this.addFrontTodo(e),!0)},n.prototype.addBackTodo=async function(e,t){try{let o="/todolist/my/daily";return o="dailyTodoSpan"===t?"/todolist/my/daily":"weeklyTodoSpan"===t?"/todolist/my/weekly":"monthlyTodoSpan"===t?"/todolist/my/monthly":"/todolist/my/notification",await syncRequestFunction("POST",o,e,"JSON")}catch(e){return console.error(e),!1}},n.prototype.addFrontTodo=function(e){let t=this.TODO_CONTAINER,o=document.createElement("div");o.classList.add("todo_div");let n=document.createElement("span");n.classList.add("completedCheck_span");let r=document.createElement("input");r.type="checkbox",r.style.display="none",r.id=e.ID;let s=document.createElement("label");s.htmlFor=e.ID,r.checked=e.IS_DONE,this.READ_ONLY||s.addEventListener("click",a),n.appendChild(r),n.appendChild(s);let c=document.createElement("div");c.classList.add("todoLabelContainer_div");let u=document.createElement("label");u.classList.add("todo_label"),e.IS_DONE&&u.classList.add("todoTextMiddleLine_label"),u.innerText=e.Value,u.addEventListener("click",d.bind(this));let p=document.createElement("span");p.addEventListener("click",i),p.innerText="···",p.classList.add("todoModifyDots_span");let T=document.createElement("span");T.addEventListener("click",l),T.innerText="X",T.classList.add("todoDelete_span");let y=document.createElement("div");y.classList.add("todoDateLimit_div"),e.DeadLine?y.innerText=Intl.DateTimeFormat("ko").format(new Date(e.DeadLine))+"까지":y.innerText="기한 없음",c.appendChild(u),this.READ_ONLY||(c.appendChild(T),c.appendChild(p)),c.appendChild(y),o.appendChild(c),o.appendChild(n),t.appendChild(o)},n.prototype.listConvertTodoObject=function(e){let t=[];for(let n=0;n<e.length;n++)t.push(new o(e[n]._id,e[n].DATA,e[n].CREATED_DATE,e[n].DEAD_LINE,e[n].IS_DONE));return t},n.prototype.getDateTodo=async function(e,t,o,n){if(this.TARGET_DATE=e,t){let t=await syncRequestFunction("GET","/todolist/target/daily?ID="+o+"&date="+e.getTime(),null,"JSON");t.status&&this.printTodo(this.listConvertTodoObject(t.result))}else{let t="";t="dailyTodoSpan"===n?"/todolist/my/daily?date="+e.getTime():"weeklyTodoSpan"===n?"/todolist/my/weekly?date="+e.getTime():"monthlyTodoSpan"===n?"/todolist/my/monthly?date="+e.getTime():"/todolist/my/notification/daily?date="+e.getTime();let o=await syncRequestFunction("GET",t,null,"JSON");o.status&&this.printTodo(this.listConvertTodoObject(o.result))}}}();let e,t,o=function(e,t,o,n,d){this.ID=e,this.Value=t,this.CreatedDate=o,this.DeadLine=n,this.IS_DONE=d}})();