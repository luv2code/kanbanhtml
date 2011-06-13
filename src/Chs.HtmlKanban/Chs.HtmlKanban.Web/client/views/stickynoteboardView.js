/// <reference path="../../Scripts/require.js" />

define(['viewmodels/stickynoteboardViewModel', 'text!views/stickynoteboardView.tmpl.htm'], function () {
    var stickynoteboard = function (templated, viewmodel) {
        this.view = templated;
        this.viewModel = viewmodel;
    }
    return stickynoteboard;
});