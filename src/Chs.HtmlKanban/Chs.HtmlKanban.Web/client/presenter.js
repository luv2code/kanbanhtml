﻿/// <reference path="../Scripts/require.js" />
/// <reference path="../Scripts/jquery-1.6.1-vsdoc.js" />
/// <reference path="../Scripts/jquery.datalink.js" />
/// <reference path="../Scripts/jquery.tmpl.js" />

define(['lib/jquery.tmpl', 'lib/jquery.datalink'], function () {
    var presenter = function () { };

    presenter.prototype = {
        createForm: function (pageName, callback, model) {
            require([
                'views/' + pageName + 'View',
                'text!views/' + pageName + 'View.tmpl.htm',
                'viewmodels/' + pageName + 'ViewModel' /* TODO: Test a page with a missing viewModel */
            ], function (view, templateText, viewModel) {
                if (viewModel) {
                    var vm = new viewModel();
                    $.extend(vm, model);
                    var templated = $.tmpl(templateText, vm);
                    $('.viewmodel', templated).link(vm, vm.linkOptions);
                    callback(new view(templated, vm));
                }
                else {
                    callback(new view($(templateText)));/* TODO: wrap in jquery necessary ? */
                }
            });
        }
    };

    return new presenter();
});