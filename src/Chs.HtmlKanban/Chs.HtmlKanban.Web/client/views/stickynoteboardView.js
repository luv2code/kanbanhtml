/// <reference path="../../Scripts/require.js" />
/// <reference path="../../Scripts/jquery-1.6.1-vsdoc.js" />

define(['viewmodels/stickynoteboardViewModel', 'text!views/stickynoteboardView.tmpl.htm', 'jquery'], function () {
    var stickynoteboard = function (templated, viewmodel) {
        var instance = this;
        this.view = templated;
        this.viewModel = viewmodel;
        $(function () {
            $('button[name="clickHere"]', instance.view).click(function () {
                instance.viewModel.createStickyNote(function (stickyNote) {
                    stickyNote.view.appendTo(instance.view); 
                });
            });
        });
    }
    return stickynoteboard;
});