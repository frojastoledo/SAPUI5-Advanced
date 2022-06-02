// @ts-nocheck
sap.ui.define([
    "sap/ui/core/UIComponent",
    "logaligroup/model/Models",
    "sap/ui/model/resource/ResourceModel",
    "./controller/HelloDialog",
    "sap/ui/Device"
],

    /** 
     * @param (typeof sap.ui.core.UIComponent) UIComponent
     * @param (typeof sap.ui.model.ResourceModel.ResourceModel) ResourceModel
     * @param (typeof sap.ui.Device) Device
  
     */
    function (UIComponent, Models, ResourceModel, HelloDialog, Device) {
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

                    //Set the devide model
                    this.setModel(Models.createDeviceModel(), "device");


                    this._helloDialog = new HelloDialog(this.getRootControl());
                     

                    //create kas vistas basada en la utl/
                    this.getRouter().initialize();

                },

                exit: function () {
                  this._helloDialog.destroy();
                  delete this._helloDialog;

                },

                openHelloDialog: function() {
                    this._helloDialog.open();
                 
                },

                getContentDensityClass: function(){
                   if (!Device.support.touch) {
                       this._sContentDensityClass = "sapUiSizeCompact";
                   } else{
                    this._sContentDensityClass = "sapUiSizeCozy";
                   }
                   return this._sContentDensityClass;
                }

            });
    });




























