sap.ui.define([
    'sap/ui/core/mvc/Controller',
    'sap/ui/core/routing/History',
    'sap/ui/core/UIComponent',
    'sap/m/MessageToast'
 
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
], function(Controller, History, UIComponent, MessageToast) {
    'use strict';

    return Controller.extend("logaligroup.controller.Details", {
       
        _onObjectMatch: function (oEvent){
            this.getView().byId("rating").reset();
            this.getView().bindElement({
                path: "/" + window.decodeURIComponent(oEvent.getParameter("arguments").invoicePath),
                model: "northwind"

            });
        },


        onInit: function () {
            const oRouter = sap.ui.core.UIComponent.getRouterFor(this);
            oRouter.getRoute("Details").attachPatternMatched(this._onObjectMatch, this);
        },

        onNavBack: function() {
            const oHistory = History.getInstance();
            const sPreviosHash = oHistory.getPreviousHash();

            if (sPreviosHash !== undefined) {
                window.history.go(-1);  
            } else {
               const oRouter =  UIComponent.getRouterFor(this);

               oRouter.navTo("RouteApp", {}, true)
            }
        },

        onRatingChange: function(oEvent){
            const fValue = oEvent.getParameter("value");
            const oResourceBundle = this.getView().getModel("i18n").getResourceBundle();

            MessageToast.show(oResourceBundle.getText("ratingConfirmation", [fValue]));
        }
    });
    
});