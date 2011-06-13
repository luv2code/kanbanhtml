/// <reference path="../Scripts/require.js" />
/// <reference path="../Scripts/jquery-1.6.1-vsdoc.js" />
/// <reference path="../Scripts/jquery.datalink.js" />
/// <reference path="../Scripts/jquery.tmpl.js" />

define(['jquery.tmpl', 'jquery.datalink'], function () {
    var presenter = function () { };

    presenter.prototype = {
        createForm: function (pageName) {
            var viewModel = require('viewmodels/' + pageName + 'ViewModel');
            var view = require('views/' + pageName + 'View');
            var templateText = require('text!views/' + pageName + 'View.tmpl.htm');
            if (viewModel) {
                var vm = new viewModel();
                var templated = $(templateText)
                    .tmpl(vm)
                    .link(vm);
                return new view(templated, vm);
            }
            else {
                return new view(templateText);
            }
        }
    };

    return presenter;
});