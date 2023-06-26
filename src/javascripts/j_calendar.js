const JHCalendar = (function () {
    function JHCalendar (targetDiv,targetDate,readOnly,monthlyEvent) {
        if(targetDiv===null || targetDiv===undefined){
            console.error("[JHCalendar error]Target div is not provided")
            return;
        }

        if(targetDate===null || targetDate===undefined){
            targetDate = new Date()
        }

        this.targetDiv = targetDiv
        this.targetDate = targetDate
        this.seletedDate = targetDate
        this.monthlyEvent = monthlyEvent
        this.readOnly = readOnly
    }

    JHCalendar.prototype.daySelected = function (day) {
        // This function is kind of interface function
    }

    JHCalendar.prototype.setPaintTarget = function (targetDate) {
        if(targetDate) {
            this.targetDate = targetDate
        }
        this.paint(this.targetDate)
        this.drawTbody(this.targetDate)
        this.buttonEvent(this.targetDate)
    }
    JHCalendar.prototype.paint = function (targetDate) {
        this.targetDiv.innerHTML = this.drawTable(targetDate.getFullYear(),targetDate.getMonth()+1)
    }

    JHCalendar.prototype.drawTable = function (year,month) {
        let html = "<table class='calendar_table'>" +
            "<thead>" +
            "<tr class='title_arrow_tr'>"+
            "<td id='calendarPrevMonthTd'><label>< 이전달</label></td>" +
            "<td class='current_month_td' colspan='5'>"+year+"년 "+month+"월</td>" +
            "<td id='calendarNextMonthTd'><label>다음달 ></label></td>" +
            "</tr>" +
            "<tr class='day_head_tr'>" +
            "<td class='red_td_font'>일</td><td>월</td><td>화</td><td>수</td><td>목</td><td>금</td><td class='blue_td_font'>토</td>" +
            "</tr>" +
            "</thead>" +
            "<tbody id='calendarTableTbody'>" +
            "</tbody>" +
            "</table>"

        return html;
    }

    Object.defineProperty(this, "monthlyEvent", {
        get() {
            return this.monthlyEvent;
        },
        set(value) {
            this.monthlyEvent = value
        }
    });

    JHCalendar.prototype.writeDailyEvent = function (Array) {
        let str = ""
        for(let i=0;i<Array.length;i++) {
            str += "<label class='daily_notifictaion_label' >"+Array[i]+"</label><br>"
        }
        return str;
    }

    JHCalendar.prototype.drawTbody = function (targetDate) {
        let monthlyEvent = this.monthlyEvent
        let thisMonthFirstDay = new Date(targetDate.getFullYear(), targetDate.getMonth(), 1);
        let thisMonthLastDay = new Date(targetDate.getFullYear(), targetDate.getMonth() + 1, 0);
        let currentNowYearMonth = (new Date()).getFullYear() === targetDate.getFullYear() && (new Date()).getMonth() === targetDate.getMonth()
        let targetYear = targetDate.getFullYear()
        let targetMonth = targetDate.getMonth()+1
        let targetDay = ""
        let weekCount = 1

        let tbody = document.getElementById("calendarTableTbody")
        let cnt = 0;
        let str = "<tr>"
        for(let i=0;i<thisMonthFirstDay.getDay();i++) {
            str += "<td></td>"
            cnt += 1
        }

        for(let i=1;i<=thisMonthLastDay.getDate();i++) {
            targetDay = i
            if(cnt%7===0) {
                str += "<tr>"
            }
            cnt+=1
            let classStr = "day_td"
            if(cnt%7===0) {
                classStr+=" blue_td_font"
            }

            if(cnt%7===1) {
                classStr+=" red_td_font"
            }

            if(currentNowYearMonth && i===(new Date()).getDate()) {
                classStr+= " day_td_selected"
            }

            let dayEvent = monthlyEvent.get(targetYear+"-"+targetMonth+"-"+targetDay)
            if(dayEvent && dayEvent.length !== 0) {
                str += "<td class='"+classStr+"' id='day-"+thisMonthLastDay.getFullYear()+"-"+thisMonthLastDay.getMonth()+"-"+i+"'><br><label class='day_label'>"+i+"</label><br><div class='notifictaion_div'>" +
                    this.writeDailyEvent(dayEvent) +
                    "</div></td>"
            }
            else {
                str += "<td class='"+classStr+"' id='day-"+thisMonthLastDay.getFullYear()+"-"+thisMonthLastDay.getMonth()+"-"+i+"'><br><label class='day_label'>"+i+"</label></td>"
            }

            if(cnt%7===0) {
                weekCount += 1
                str += "</tr>"
            }
        }
        tbody.innerHTML = str;
        let tds = document.getElementsByClassName("day_td")
        for(let i=0;i<tds.length;i++) {
            tds[i].style.height = "calc(100% /"+weekCount+")"
        }
    }

    JHCalendar.prototype.buttonEvent = function (targetDate) {
        document.getElementById("calendarPrevMonthTd").removeEventListener("click",this.prevMonthEvent.bind(this))
        document.getElementById("calendarPrevMonthTd").addEventListener("click",this.prevMonthEvent.bind(this))

        document.getElementById("calendarNextMonthTd").removeEventListener("click",this.nextMonthEvent.bind(this))
        document.getElementById("calendarNextMonthTd").addEventListener("click",this.nextMonthEvent.bind(this))

        let allDay = document.getElementsByClassName("day_td")
        for(let i=0;i<allDay.length;i++) {
            allDay[i].removeEventListener("click",this.dailySelectEvent.bind(this))
            allDay[i].addEventListener("click",this.dailySelectEvent.bind(this))
        }
    }

    JHCalendar.prototype.prevMonthEvent = async function (event) {
        let newTarget = new Date(this.targetDate.getFullYear(), this.targetDate.getMonth() - 1, 1);
        this.monthlyEvent = await this.getRecentMonthlyNotification(newTarget)
        this.setPaintTarget(newTarget)
    }

    JHCalendar.prototype.nextMonthEvent = async function (event) {
        let newTarget = new Date(this.targetDate.getFullYear(), this.targetDate.getMonth() + 1, 1);
        this.monthlyEvent = await this.getRecentMonthlyNotification(newTarget)
        this.setPaintTarget(newTarget)
    }

    JHCalendar.prototype.dailySelectEvent = function (event) {
        let dayID = event.currentTarget.getAttribute("id");
        let currentSelected = document.getElementsByClassName("day_td_selected")
        for(let i=0;i<currentSelected.length;i++) {
            currentSelected[i].classList.remove("day_td_selected")
        }
        event.currentTarget.classList.add("day_td_selected")

        let dayStr = dayID.split("-")
        this.daySelected(new Date(dayStr[1],dayStr[2],dayStr[3]))
        this.seletedDate = new Date(dayStr[1],dayStr[2],dayStr[3])
    }

    JHCalendar.prototype.getRecentMonthlyNotification = async function (DATE){
        return new Promise(resolve => {resolve(new Map())})
    }

    return JHCalendar;
}())

module.exports = JHCalendar