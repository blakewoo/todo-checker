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
        let html = document.getElementsByTagName("html")

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