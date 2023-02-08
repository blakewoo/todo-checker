const JH_calendar = (function () {
    function JH_calendar (targetDiv,targetDate) {
        if(targetDiv===null || targetDiv===undefined){
            console.error("targetDiv is not provided")
            return;
        }

        if(targetDate===null || targetDate===undefined){
            targetDate = new Date()
        }

        this.targetDiv = targetDiv
        this.targetDate = targetDate
        this.thisMonthFirstDay = new Date(targetDate.getFullYear(), targetDate.getMonth(), 1);
        this.thisMonthLastDay = new Date(targetDate.getFullYear(), targetDate.getMonth() + 1, 0);

        this.setPaintTarget()
    }

    JH_calendar.prototype.setPaintTarget = function () {
        this.targetDiv.innerHTML = this.paint(this.targetDate)
        this.drawTbody()
        this.buttonEvent()
    }
    JH_calendar.prototype.paint = function (targetDate) {
        return this.drawTable(targetDate.getFullYear(),targetDate.getMonth()+1)
    }

    JH_calendar.prototype.drawTable = function (year,month) {
        let html = "<table class='calendar_table'>" +
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

    JH_calendar.prototype.drawTbody = function () {
        let tbody = document.getElementById("calendar_table_tbody")
        let cnt = 0;
        let str = "<tr>"
        for(let i=0;i<this.thisMonthFirstDay.getDay();i++) {
            str += "<td></td>"
            cnt += 1
        }
        for(let i=1;i<this.thisMonthLastDay.getDate();i++) {
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
    }

    JH_calendar.prototype.buttonEvent = function () {

    }

    return JH_calendar;
}())