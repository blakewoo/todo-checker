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

    JHCalendar.prototype.paint = function () {
        let tableElement = this.drawTable(this.targetDate.getFullYear(),this.targetDate.getMonth()+1)
        let tdElements = this.drawTbody(this.targetDate,tableElement.tbody)
        this.buttonEvent(this.targetDate,tableElement.leftArrowTd,tableElement.rightArrowTd,tdElements)
        this.targetDiv.innerHTML = ""
        this.targetDiv.appendChild(tableElement.table)
    }

    JHCalendar.prototype.drawTable = function (year,month) {
        let table = document.createElement("table")
        table.classList.add("calendar_table")

        let thead = document.createElement("thead")

        let firstTr = document.createElement("tr")
        firstTr.classList.add("title_arrow_tr")

        let leftArrowTd = document.createElement("td")
        leftArrowTd.id = "calendarPrevMonthTd"
        leftArrowTd.innerHTML = "<label>< 이전달</label>"

        let viewTd = document.createElement("td")
        viewTd.classList.add("current_month_td")
        viewTd.colSpan = 5
        viewTd.innerText = year+"년 "+month+"월"

        let rightArrowTd = document.createElement("td")
        rightArrowTd.id = "calendarNextMonthTd"
        rightArrowTd.innerHTML = "<label>다음달 ></label>"

        let secondTr = document.createElement("tr")
        secondTr.classList.add("day_head_tr")
        secondTr.innerHTML =  "<td class='red_td_font'>일</td><td>월</td><td>화</td><td>수</td><td>목</td><td>금</td><td class='blue_td_font'>토</td>"

        let tbody = document.createElement("tbody")
        tbody.id = "calendarTableTbody"

        firstTr.appendChild(leftArrowTd)
        firstTr.appendChild(viewTd)
        firstTr.appendChild(rightArrowTd)

        thead.appendChild(firstTr)
        thead.appendChild(secondTr)

        table.appendChild(thead)
        table.appendChild(tbody)

        return {table:table, tbody:tbody, leftArrowTd:leftArrowTd, rightArrowTd:rightArrowTd}
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

    JHCalendar.prototype.drawTbody = function (targetDate,tbody) {
        let monthlyEvent = this.monthlyEvent
        let thisMonthFirstDay = new Date(targetDate.getFullYear(), targetDate.getMonth(), 1);
        let thisMonthLastDay = new Date(targetDate.getFullYear(), targetDate.getMonth() + 1, 0);
        let currentNowYearMonth = (new Date()).getFullYear() === targetDate.getFullYear() && (new Date()).getMonth() === targetDate.getMonth()
        let targetYear = targetDate.getFullYear()
        let targetMonth = targetDate.getMonth()+1
        let targetDay = ""
        let weekCount = 1
        let tdArrays = []

        let cnt = 0;

        let tr1 = document.createElement("tr")
        for(let i=0;i<thisMonthFirstDay.getDay();i++) {
            tr1.appendChild(document.createElement("td"))
            cnt += 1
        }

        let tempTr = tr1
        for(let i=1;i<=thisMonthLastDay.getDate();i++) {
            targetDay = i
            if(cnt%7===0) {
                tempTr = document.createElement("tr")
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
            let tempTd = document.createElement("td")
            if(dayEvent && dayEvent.length !== 0) {
                tempTd.classList.add(classStr)
                tempTd.id = "day-"+thisMonthLastDay.getFullYear()+"-"+thisMonthLastDay.getMonth()+"-"+i
                tempTd.innerHTML = "<br><label class='day_label'>"+i+"</label><br><div class='notifictaion_div'>" +
                    this.writeDailyEvent(dayEvent) +
                    "</div>"
            }
            else {
                tempTd.classList.add(classStr)
                tempTd.id = "day-"+thisMonthLastDay.getFullYear()+"-"+thisMonthLastDay.getMonth()+"-"+i
                tempTd.innerHTML = "<br><label class='day_label'>"+i+"</label>"
            }
            tdArrays.push(tempTd)

            if(cnt%7===0) {
                weekCount += 1
                tbody.appendChild(tempTr)
            }
        }

        for(let i=0;i<tdArrays.length;i++) {
            tdArrays[i].style.height = "calc(100% /"+weekCount+")"
        }

        return tdArrays
    }

    JHCalendar.prototype.buttonEvent = function (targetDate,left,right,tdArray) {
        left.addEventListener("click",this.prevMonthEvent.bind(this))
        right.addEventListener("click",this.nextMonthEvent.bind(this))

        for(let i=0;i<tdArray.length;i++) {
            tdArray[i].addEventListener("click",this.dailySelectEvent.bind(this))
        }
    }

    JHCalendar.prototype.prevMonthEvent = async function (event) {
        let newTarget = new Date(this.targetDate.getFullYear(), this.targetDate.getMonth() - 1, 1);
        this.monthlyEvent = await this.getRecentMonthlyNotification(newTarget)
        this.targetDate = newTarget
        this.paint()
    }

    JHCalendar.prototype.nextMonthEvent = async function (event) {
        let newTarget = new Date(this.targetDate.getFullYear(), this.targetDate.getMonth() + 1, 1);
        this.monthlyEvent = await this.getRecentMonthlyNotification(newTarget)
        this.targetDate = newTarget
        this.paint()
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