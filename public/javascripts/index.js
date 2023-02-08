window.onload = function (event) {
    new JH_calendar(document.getElementById("calendar_div"),new Date())
    printTodoList(new Date())
}

function printTodoList (date) {
    let url = "/todolist/my?date="+date.getTime()
    // requestFunction("GET",url,"","JSON",function (result) {
    //
    // })
}