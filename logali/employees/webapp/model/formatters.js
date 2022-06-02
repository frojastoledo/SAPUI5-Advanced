sap.ui.define([], function () {

    function dateFormat(date) {
        var timeDay = 24 * 60 * 60 * 1000;

        if (date) {
            var dateNow = new Date();
            var dateFormatOnlyDate = sap.ui.core.format.DateFormat.getDateInstance({ pattern: "yyy/MM/dd" });
            var dateNowFormat = new Date(dateFormatOnlyDate.format(dateNow));
            var oResourceBundle = this.getView().getModel("i18n").getResourceBundle();
            switch (true) {
                case date.getTime() === dateNowFormat.getTime():
                    return oResourceBundle.getText("today");
                case date.getTime() === dateNowFormat.getTime() + timeDay:
                    return oResourceBundle.getText("tomorrow");
                case date.getTime() === dateNowFormat.getTime() - timeDay:
                    return oResourceBundle.getText("yesterdayy");
                default:
                    return "";
            }

        }

    }


    return {
        dateFormat: dateFormat
    }
});