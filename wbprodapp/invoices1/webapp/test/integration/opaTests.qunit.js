//@ts-nocheck
/* eslint-disable no-undef */

/* global qunit */
QUnit.config.autostart  = false;

sap.ui.getCore().attachInit(function (){
     "use strict";

     sap.ui.require([
        "logaligroup/test/integration/NavigationJourney"
    ], function () {
         QUnit.start();
    })

});


