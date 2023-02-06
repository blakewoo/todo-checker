function calendar(targetDiv,targetDate) {
    if(targetDiv===null || targetDiv===undefined){
        console.error("targetDiv is not provided")
        return;
    }

    if(targetDate===null || targetDate===undefined){
        targetDate = new Date()
    }

    let thisDate = targetDate
    let thisMonthFirstDay = new Date(thisDate.getFullYear(), thisDate.getMonth(), 1);
    let thisMonthLastDay = new Date(thisDate.getFullYear(), thisDate.getMonth() + 1, 0);

    targetDiv.innerHTML = drawTable(thisDate.getFullYear(),thisDate.getMonth()+1)

    // 실제로 날짜 생성하는 로직
    let tbody = document.getElementById("calendar_table_tbody")
    let cnt = 0;
    let str = "<tr>"
    for(let i=0;i<thisMonthFirstDay.getDay();i++) {
        str += "<td></td>"
        cnt += 1
    }
    for(let i=1;i<thisMonthLastDay.getDate();i++) {
        if(cnt%7===0) {
            str += "<tr>"
        }
        cnt+=1
        if(cnt%7===6) {
            str += "<td class='day_td blue_font'><br><label class='day_label'>"+i+"</label></td>"
        }
        else if(cnt%7===0) {
            str += "<td class='day_td red_font'><br><label class='day_label'>"+i+"</label></td>"
        }
        else {
            str += "<td class='day_td'><br><label class='day_label'>"+i+"</label></td>"
        }

        if(cnt%7===0) {
            str += "</tr>"
        }
    }
    tbody.innerHTML = str;
    btnEvent()

    function drawTable (year,month) {
        var html = "<table class='calendar_table'>" +
            "<thead>" +
            "<tr class='title_arrow_tr'>"+
            "<td id='calendar_prevMonth'><</td>" +
            "<td colspan='5'>"+year+"년 "+month+"월</td>" +
            "<td id='calendar_nextMonth'>></td>" +
            "</tr>" +
            "<tr class='day_head_tr'>" +
            "<td>월</td><td>화</td><td>수</td><td>목</td><td>금</td><td class='blue_font'>토</td><td class='red_font'>일</td>" +
            "</tr>" +
            "</thead>" +
            "<tbody id='calendar_table_tbody'>" +
            "</tbody>" +
            "</table>"

        return html;
    }

    function btnEvent() {
        document.getElementById("calendar_prevMonth").removeEventListener("click",prevButtonEvent)
        document.getElementById("calendar_nextMonth").removeEventListener("click",nextButtonEvent)
        document.getElementById("calendar_prevMonth").addEventListener("click",prevButtonEvent)
        document.getElementById("calendar_nextMonth").addEventListener("click",nextButtonEvent)
        let days = document.getElementsByClassName("day_td")
        for(let i=0;i<days.length;i++) {
            days[i].removeEventListener("click",daySelectionEvent)
            days[i].addEventListener("click",daySelectionEvent)
        }
    }

    function prevButtonEvent(event){
        let newDate = new Date(targetDate.getFullYear(),targetDate.getMonth()-1,targetDate.getDate())
        calendar(targetDiv,newDate)
    }
    function nextButtonEvent(event) {
        let newDate = new Date(targetDate.getFullYear(),targetDate.getMonth()+1,targetDate.getDate())
        calendar(targetDiv,newDate)
    }
    function daySelectionEvent(event) {
        let temp = document.getElementsByClassName("day_selected")
        for(let i=0;i<temp.length;i++) {
            temp[i].classList.remove("day_selected")
        }
        event.currentTarget.classList.add("day_selected")
    }

}