//@ts-nocheck
sap.ui.define([
    "logaligroup/localService/mockserver",
    "sap/ui/test/opaQunit",
    "./pages/HelloPanel"
],

/**
 * @param {typeof sap.ui.test.opaQunit} opaQunit
 */

function(mockserver, opaQunit){
   
     QUnit.module("Navigation");

     
     opaQunit("Debiera abrir el dialogo Hello", function(Given, When, then){
        
       // Initialize
       
        mockserver.init();

        //Arrangements
       Given.iStartMyUIComponent({
           componentConfig: {
               name: "logaligroup"
           }
       });

       //Actions
       When.onTheAppPage.iSayHelloDialogButton();

       //Assertions
         then.onTheAppPage.iSeeTheHelloDialog();


       //Cleanup
       then.iTeardownMyApp();
       
       

     });

});