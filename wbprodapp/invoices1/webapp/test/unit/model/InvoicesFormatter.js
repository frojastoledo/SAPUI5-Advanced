//@ts-nocheck
sap.ui.define([
    "logaligroup/model/InvoicesFormatter",
    "sap/ui/model/resource/ResourceModel"

], 
/**
 * @param {typeof sap.ui.model.resource.ResourceModel} ResourceModel
 */
function (InvoicesFormatter, ResourceModel) {

     QUnit.module("Qnvoices Status", {
          beforeEach: function () {
               this._oResourceModel = new ResourceModel({
                   bundleUrl: sap.ui.require.toUrl("logaligroup") + "/i18n/i18n.properties"
               });
          },

          afterEach: function () {
              this._oResourceModel.destroy();
          }
     });

     QUnit.test("Deberia retornar el estado", function(assert){
         let oModel = this.stub();
         oModel.withArgs("i18n").returns(this._oResourceModel);

         let oViewStub = {
             getModel: oModel
         };

         let oControllerStub = {
             getView : this.stub().returns(oViewStub)
         };

         let fnIsolatedFormatter = InvoicesFormatter.invoiceStatus.bind(oControllerStub);

         //Assert
         assert.strictEqual(fnIsolatedFormatter("A"), "New", "El estado de la factura para A es correcto");
         assert.strictEqual(fnIsolatedFormatter("B"), "In Progress", "El estado de la factura para b es correcto");
         assert.strictEqual(fnIsolatedFormatter("C"), "Done", "El estado de la factura para C es correcto");
     });
});