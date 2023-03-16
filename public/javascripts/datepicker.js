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
        let targetYear = Year ? Year : this.targetYear
        let targetMonth = Month ? Month : this.targetMonth

        let html = document.getElementsByTagName("html")
        let datepickerContainerDiv = document.createElement("div")
        datepickerContainerDiv.classList.add("jh_datepicker_div")
        datepickerContainerDiv.style.left = this.xPoint+"px"
        datepickerContainerDiv.style.top = this.yPoint+"px"

        let datepickerTable = document.createElement("table")
        datepickerTable.classList.add("jh_datepicker_div_table")

        this.drawTable(datepickerTable)

        datepickerContainerDiv.appendChild(datepickerTable)
        html.appendChild(datepickerContainerDiv)
    }

    JH_datepicker.prototype.drawTable = function (table) {

        let thead = document.createElement("thead")
        let titleArrowTr = document.createElement("tr")
        let leftArrowTd = document.createElement("td")
        leftArrowTd.innerHTML = "<"

        let rightArrowTd = document.createElement("td")
        leftArrowTd.innerHTML = ">"

        let currentMonthViewTd = document.createElement("td")
        currentMonthViewTd.colSpan = 5
        currentMonthViewTd.innerHTML = this.targetYear+"년 "+this.targetMonth+"월"

        titleArrowTr.appendChild(leftArrowTd)
        titleArrowTr.appendChild(currentMonthViewTd)
        titleArrowTr.appendChild(rightArrowTd)

        let dayHeadTr = document.createElement("tr")
        let td1 = document.createElement("td")
        td1.innerText = "월"

        let td2 = document.createElement("td")
        td2.innerText = "화"

        let td3 = document.createElement("td")
        td3.innerText = "수"

        let td4 = document.createElement("td")
        td4.innerText = "목"

        let td5 = document.createElement("td")
        td5.innerText = "금"

        let td6 = document.createElement("td")
        td6.innerText = "토"
        td6.classList.add("jh_datepicker_div_table_thead_sat")

        let td7 = document.createElement("td")
        td7.innerText = "일"
        td7.classList.add("jh_datepicker_div_table_thead_sun")

        dayHeadTr.appendChild(td1)
        dayHeadTr.appendChild(td2)
        dayHeadTr.appendChild(td3)
        dayHeadTr.appendChild(td4)
        dayHeadTr.appendChild(td5)
        dayHeadTr.appendChild(td6)
        dayHeadTr.appendChild(td7)

        thead.appendChild(titleArrowTr)
        thead.appendChild(dayHeadTr)

        let tbody = document.createElement("tbody")
        this.drawTbody(tbody)
    }

    JH_datepicker.prototype.drawTbody = function (tbody) {
        let targetMonthFirstDay = new Date(this.targetYear, this.targetMonth, 1);
        let targetMonthLastDay = new Date(this.targetYear, this.targetMonth+1, 0);

    }

    JH_datepicker.prototype.prevMonthEvent = function (event) {

    }

    JH_datepicker.prototype.nextMonthEvent = function (event) {

    }

    JH_datepicker.prototype.dailySelectEvent = function (event) {

    }

    JH_datepicker.prototype.getDay = function (day) {

    }

    return JH_datepicker
}())