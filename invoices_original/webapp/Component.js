// @ts-nocheck
sap.ui.define([
    "sap/ui/core/UIComponent",
    "logaligroup/model/Models",
    "sap/ui/model/resource/ResourceModel",
    "./controller/HelloDialog"
],

    /** 
     * @param (typeof sap.ui.core.UIComponent) UIComponent
  
     */
    function (UIComponent, Models, ResourceModel, HelloDialog) {
        return UIComponent.extend("logaligroup.Component", {

            metadata: {

                manifest: "json"
                
            },

            init: function () {
                    // llamar a la funcion init padre
                    UIComponent.prototype.init.apply(this, arguments);

                    // set data model en la vista
                    this.setModel(Models.createRecipient());

                    //set i18n model en la vista
                    let i18nModel = new ResourceModel({ bundleName: "logaligroup.i18n.i18n" });
                    this.setModel(i18nModel, "i18n");

                    this._helloDialog = new HelloDialog(this.getRootControl());

                },

                exit: function () {
                  this._helloDialog.destroy();
                  delete this._helloDialog;

                },

                openHelloDialog: function() {
                    this._helloDialog.open();
                 
                }

            });
    });




























