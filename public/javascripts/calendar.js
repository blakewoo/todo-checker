function calendar(targetDiv,date) {
    if(targetDiv===null || targetDiv===undefined){
        console.error("targetDiv is not provided")
        return;
    }

    if(date===null || date===undefined){
        date = new Date()
    }

    let thisDate = date
    let thisMonthFirstDay = new Date(thisDate.getFullYear(), thisDate.getMonth(), 1);
    let thisMonthLastDay = new Date(thisDate.getFullYear(), thisDate.getMonth() + 1, 0);

    targetDiv.innerHTML = drawTable(thisDate.getFullYear(),thisDate.getMonth()+1)

    // 실제로 날짜 생성하는 로직



    function drawTable (year,month) {
        var html = "<table class='calendar_table'>" +
            "<thead>" +
            "<tr class='title_arrow_tr'>"+
            "<th><</th>" +
            "<th colspan='5'>"+year+"년 "+month+"월</th>" +
            "<th>></th>" +
            "</tr>" +
            "<thead>" +
            "<tr class='day_tr'>" +
            "<td>월</td><td>화</td><td>수</td><td>목</td><td>금</td><td>토</td><td>일</td>" +
            "</tr>" +
            "</thead>" +
            "<tbody>" +
            "</tbody>" +
            "</table>"

        return html;
    }

    function btnEvent() {

    }

}