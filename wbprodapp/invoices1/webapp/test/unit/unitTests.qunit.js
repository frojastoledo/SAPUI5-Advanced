//@ts-nocheck
/* eslint-disable no-undef */

/* global qunit */

 
QUnit.config.autostart = false;
var oCore = sap.ui.getCore();

oCore.attachInit(function () {
    "use strict";

    sap.ui.require([
        "logaligroup/test/unit/AllTests"
    ], function () {
         QUnit.start();
    })
});