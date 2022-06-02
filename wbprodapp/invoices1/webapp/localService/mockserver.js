//@ts-nocheck
sap.ui.define([
 "sap/ui/core/util/MockServer",
 "sap/ui/model/json/JSONModel",
 "sap/base/util/UriParameters",
 "sap/base/Log"
],

/**
 * @param{ typeof sap.ui.core.util.MockServer } MockServer
 * @param{ typeof sap.ui.model.json.JSONModel } JSONModel
 */

    function (MockServer, JSONModel, UriParameters, Log ){
      "use strict";

      var oMockServer,
          _sAppPath = "logaligroup/",
          _sJsonFilesPath = _sAppPath + "localService/mockdata";

          var oMockServerInterface = {
  
               init: function(oOptionParameters){
                var oOptions = oOptionParameters || {};

                return new Promise(function(fnResolve, fnReject){
                   var sManifestUrl = sap.ui.require.toUrl(_sAppPath + "manifest.json"),
                       oManifestModel = new JSONModel(sManifestUrl);

                       oManifestModel.attachRequestCompleted(function () {
                            var oUriParameters  = new UriParameters(window.location.href);

                            var sJsonFileUrl = sap.ui.require.toUrl(_sJsonFilesPath);
                            var oMainDataSource = oManifestModel.getProperty("/sap.app/dataSources/mainService");
                            var sMetadataUrl = sap.ui.require.toUrl(_sAppPath + oMainDataSource.settings.localUri );

                            var sMockServerUrl = oMainDataSource.uri && new URI(oMainDataSource.uri).absoluteTo(sap.ui.require.toUrl(_sAppPath)).toString();

                            //crear una instancia a mock server o detener una para reiniciarla"
                            if(!oMockServer){
                                oMockServer = new MockServer({
                                     rootUri : sMockServerUrl

                                });

                            }else{
                                oMockServer.stop();
                            }

                            //configura mock server ci las opciones dadas o un delay por defaul de 0.5 s

                             MockServer.config({
                                 autoRespond: true,
                                 autoRespondAfter : (oOptions.delay || oUriParameters.get("serverDelay") || 500)
                             });

                             //simular todas las solicitudes usando mock data
                             oMockServer.simulate(sMetadataUrl, {
                                 sMockdataBaseUrl : sJsonFileUrl,
                                 bGenerateMissingMockData : true
                             });

                             var aRequests = oMockServer.getRequests();

                             var fnResponse = function (iErrCode, Smessage, aRequest){
                                 aRequest.response = function(oXhr){
                                     oXhr.respond(iErrCode, {"Contet-Type" : "text/plain;charset=utf-8"}, Smessage);

                                 };
                             };
                             if (oOptions.metadataError || oUriParameters.get("metadaError")) {
                                 aRequests.forEach(function (aEntry){
                                        if (aEntry.path.toString().indexof("$metadata") > -1){
                                            fnResponse(500, "metadata Error", aEntry);
                                        }
                                 });
                             };
                             var sErrorParam = oOptions.errorType || oUriParameters.get("errorType");
                             var iErrorCode = sErrorParam === "badRequest" ? 400 : 500;

                             if (sErrorParam) {
                                 aRequests.forEach(function (aEntry){
                                     fnResponse(iErrorCode, sErrorParam, aEntry);
                                 });
                             };

                             oMockServer.setRequests(aRequests);
                             oMockServer.start();

                             Log.info("Corriendo la App con mock data");
                             fnResolve();

                       });
                       oManifestModel.attachRequestFailed(function (){
                           var sError = "Fallo la carga de la aplicación Manifest";

                           Log.error(sError);
                           fnReject(new Error(sError));

                       });
                });
               }
          };

          return oMockServerInterface;
    });