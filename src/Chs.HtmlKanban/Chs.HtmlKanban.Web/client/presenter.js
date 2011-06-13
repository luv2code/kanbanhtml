/// <reference path="../Scripts/require.js" />
/// <reference path="../Scripts/jquery-1.6.1-vsdoc.js" />
/// <reference path="../Scripts/jquery.datalink.js" />
/// <reference path="../Scripts/jquery.tmpl.js" />

define(['lib/jquery.tmpl', 'lib/jquery.datalink'], function () {
    var presenter = function () { };

    presenter.prototype = {
        createForm: function (pageName, callback) {
            require([
                'views/' + pageName + 'View',
                'text!views/' + pageName + 'View.tmpl.htm',
                'viewmodels/' + pageName + 'ViewModel'
            ], function (view, templateText, viewModel) {
                if (viewModel) {
                    var vm = new viewModel();
                    var templated = $.tmpl(templateText, vm).link(vm, vm.linkOptions);
                    callback(new view(templated, vm));
                }
                else {
                    callback(new view($(templateText)));
                }
            });
        }
    };

    return new presenter();
});