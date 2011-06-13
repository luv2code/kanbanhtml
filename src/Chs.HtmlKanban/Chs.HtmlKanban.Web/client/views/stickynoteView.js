/// <reference path="../../Scripts/require.js" />

define(['viewmodels/stickynoteViewModel', 'text!views/stickynoteView.tmpl.htm'], function () {
    var stickynote = function (templated, viewmodel) {
        this.viewModel = viewmodel;
        this.view = templated;
    }
    return stickynote;
});