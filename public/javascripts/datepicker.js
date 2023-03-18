const JH_datepicker = (function () {
    function JH_datepicker (x,y,targetYear,targetMonth,limitStartDate=null,limitEndDate=null) {
        this.xPoint = x
        this.yPoint = y
        this.targetYear = targetYear
        this.targetMonth = targetMonth
        this.limitStartDate = limitStartDate
        this.limitEndDate = limitEndDate
        this.paint(targetYear,targetMonth)
    }

    JH_datepicker.prototype.paint = function (Year,Month) {
        if(Year) {
            this.targetYear = Year
        }
        if(Month){
            this.targetMonth = Month
        }

        let body = document.getElementsByTagName("body")[0]
        let datepickerContainerDiv = document.createElement("div")
        datepickerContainerDiv.classList.add("jh_datepicker_div")
        datepickerContainerDiv.style.left = this.xPoint+"px"
        datepickerContainerDiv.style.top = this.yPoint+"px"

        let datepickerTable = document.createElement("table")
        datepickerTable.classList.add("jh_datepicker_div_table")

        this.drawTable(datepickerTable)

        datepickerContainerDiv.appendChild(datepickerTable)
        body.appendChild(datepickerContainerDiv)
    }

    JH_datepicker.prototype.drawTable = function (table) {

        let thead = document.createElement("thead")
        let titleArrowTr = document.createElement("tr")
        let leftArrowTd = document.createElement("td")
        leftArrowTd.innerHTML = "<"
        leftArrowTd.addEventListener("click",this.prevMonthEvent)

        let rightArrowTd = document.createElement("td")
        rightArrowTd.innerHTML = ">"
        rightArrowTd.addEventListener("click",this.nextMonthEvent)

        let currentMonthViewTd = document.createElement("td")
        currentMonthViewTd.colSpan = 5
        currentMonthViewTd.innerHTML = this.targetYear+"년 "+this.targetMonth+"월"

        titleArrowTr.appendChild(leftArrowTd)
        titleArrowTr.appendChild(currentMonthViewTd)
        titleArrowTr.appendChild(rightArrowTd)

        let dayHeadTr = document.createElement("tr")
        let td1 = document.createElement("td")
        td1.innerText = "일"
        td1.classList.add("jh_datepicker_div_table_thead_sun")

        let td2 = document.createElement("td")
        td2.innerText = "월"

        let td3 = document.createElement("td")
        td3.innerText = "화"

        let td4 = document.createElement("td")
        td4.innerText = "수"

        let td5 = document.createElement("td")
        td5.innerText = "목"

        let td6 = document.createElement("td")
        td6.innerText = "금"

        let td7 = document.createElement("td")
        td7.innerText = "토"
        td7.classList.add("jh_datepicker_div_table_thead_sat")

        dayHeadTr.appendChild(td1)
        dayHeadTr.appendChild(td2)
        dayHeadTr.appendChild(td3)
        dayHeadTr.appendChild(td4)
        dayHeadTr.appendChild(td5)
        dayHeadTr.appendChild(td6)
        dayHeadTr.appendChild(td7)

        thead.appendChild(titleArrowTr)
        thead.appendChild(dayHeadTr)

        table.append(thead)

        let tbody = document.createElement("tbody")
        this.drawTbody(tbody)

        table.append(tbody)
    }

    JH_datepicker.prototype.drawTbody = function (tbody) {
        let targetMonthFirstDay = new Date(this.targetYear, this.targetMonth, 1);
        let targetMonthLastDay = new Date(this.targetYear, this.targetMonth+1, 0);

        let cnt = 0
        let day = 1
        let firstRow = document.createElement("tr")
        for(let i=0;i<targetMonthFirstDay.getDay();i++) {
            let tempTd = document.createElement("td")
            firstRow.appendChild(tempTd)
            cnt += 1
        }
        for(let i=targetMonthFirstDay.getDay();i<=6;i++) {
            let tempTd = document.createElement("td")
            if(cnt%7===0) {
                tempTd.classList.add("jh_datepicker_div_table_thead_sat")
            }
            if(cnt%7===1) {
                tempTd.classList.add("jh_datepicker_div_table_thead_sun")
            }
            tempTd.classList.add("jh_datepicker_div_table_tbody_td")
            tempTd.innerText = day.toString()
            firstRow.appendChild(tempTd)
            day += 1
            cnt += 1
        }
        tbody.appendChild(firstRow)

        let tempTr;
        for(;day<=targetMonthLastDay.getDate();day++, cnt++) {
            if(cnt%7===0) {
                tempTr = document.createElement("tr")
            }
            let tempTd = document.createElement("td")
            if(cnt%7===6) {
                tempTd.classList.add("jh_datepicker_div_table_thead_sat")
            }
            if(cnt%7===0) {
                tempTd.classList.add("jh_datepicker_div_table_thead_sun")
            }
            tempTd.classList.add("jh_datepicker_div_table_tbody_td")
            tempTd.innerText = day.toString()
            tempTr.appendChild(tempTd)
            if(cnt%7===0) {
                tbody.appendChild(tempTr)
            }
        }


        // let cnt = 0;
        // let str = "<tr>"
        // for(let i=0;i<targetMonthFirstDay.getDay();i++) {
        //     str += "<td></td>"
        //     cnt += 1
        // }
        // for(let i=1;i<targetMonthLastDay.getDate();i++) {
        //     if(cnt%7===0) {
        //         str += "<tr>"
        //     }
        //     cnt+=1
        //     let classStr = "jh_datepicker_div_table_tbody_td"
        //     if(cnt%7===6) {
        //         classStr+=" jh_datepicker_div_table_tbody_sat"
        //     }
        //
        //     if(cnt%7===0) {
        //         classStr+=" jh_datepicker_div_table_tbody_sun"
        //     }
        //
        //     str += "<td class='"+classStr+"' id='datepicker-"+targetMonthFirstDay.getFullYear()+"-"+targetMonthFirstDay.getMonth()+"-"+i+"'><br><label class='day_label'>"+i+"</label></td>"
        //
        //     if(cnt%7===0) {
        //         str += "</tr>"
        //     }
        // }
        // tbody.innerHTML = str;
    }

    JH_datepicker.prototype.prevMonthEvent = function (event) {
        this.paint(this.targetYear,this.targetMonth-1)
    }

    JH_datepicker.prototype.nextMonthEvent = function (event) {
        this.paint(this.targetYear,this.targetMonth+1)
    }

    JH_datepicker.prototype.dailySelectEvent = function (event) {
        let dayID = event.currentTarget.getAttribute("id");

        let dayStr = dayID.split("-")
        this.getDay(new Date(dayStr[1],dayStr[2],dayStr[3]))
    }

    JH_datepicker.prototype.getDay = function (day) {

    }

    return JH_datepicker
}())