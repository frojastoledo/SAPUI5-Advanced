// @ts-nocheck
sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "logaligroup/employees/model/formatters"
], function (Controller, Formatter) {

    function onInit() {
      this._bus = sap.ui.getCore().getEventBus();
    }; 

    function onCreateIncidence(oEvent) {
        var tableIncidence = this.getView().byId("tableIncidence");
        var newIncidence = sap.ui.xmlfragment("logaligroup.employees.fragment.NewIncidence", this);
        var incidenceModel = this.getView().getModel("incidenceModel");
        var odata = incidenceModel.getData();
        var index = odata.length;
        odata.push({ index: index + 1 });
        incidenceModel.refresh();
        newIncidence.bindElement("incidenceModel>/"+ index);
        tableIncidence.addContent(newIncidence);

    };

    function onDeleteIncidence(oEvent){
        var tableIncidence = this.getView().byId("tableIncidence");
        var rowIncidence = oEvent.getSource().getParent().getParent();
        var incidenceModel = this.getView().getModel("incidenceModel");
        var odata = incidenceModel.getData();
        var contextObj = rowIncidence.getBindingContext("incidenceModel").getObject();
        odata.splice(contextObj.index-1,1);
        for(var i in odata){
            odata[i].index = parseInt(i) + 1;

        }

        incidenceModel.refresh();
        tableIncidence.removeContent(rowIncidence);
        for(var j in tableIncidence.getContent()){
            tableIncidence.getContent()[j].bindElement("incidenceModel>/"+j);
        }

    };

    function onSaveIncidence(oEvent){
      var incidence = oEvent.getSource().getParent().getParent();
      var incidenceRow = incidence.getBindingContext("incidenceModel");
      var temp = incidenceRow.sPath.replace('/', '');
      this._bus.publish("incidence", "onSaveincidence", { incidenceRow : incidenceRow.sPath.replace('/', '')});

    };


    var EmpployeeDetails = Controller.extend("logaligroup.employees.controller.EmployeeDetails", {});

    EmpployeeDetails.prototype.onInit = onInit;
    EmpployeeDetails.prototype.onCreateIncidence = onCreateIncidence;
    EmpployeeDetails.prototype.onDeleteIncidence = onDeleteIncidence;
    EmpployeeDetails.prototype.Formatter = Formatter;
    EmpployeeDetails.prototype.onSaveIncidence = onSaveIncidence;
    return EmpployeeDetails;
});



