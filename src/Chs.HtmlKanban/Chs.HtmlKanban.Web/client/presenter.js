/// <reference path="../Scripts/require.js" />
/// <reference path="../Scripts/jquery-1.6.1-vsdoc.js" />
/// <reference path="../Scripts/jquery.tmpl.js" />
/// <reference path="../Scripts/knockout-1.2.1.debug.js" />
/// <reference path="../Scripts/knockout.mapping-latest.debug.js" />


define(['lib/knockout', 'lib/jquery.tmpl'], function () {
    var presenter = function () { };

    presenter.prototype = {
        createForm: function (pageName, callback, model) {
            require([
                'views/' + pageName + 'View',
                'text!views/' + pageName + 'View.tmpl.htm',
                'viewmodels/' + pageName + 'ViewModel' /* TODO: Test a page with a missing viewModel */
            ], function (view, templateText, viewModel) {
                if (viewModel) {
                    var vm = ko.mapping.fromJS(new viewModel());
                    if (model)
                        ko.mapping.updateFromJS(vm, model);
                    //					if(model)
                    //						$.extend(true, vm, ko.mapping.fromJS(model));
                    var templated = $.tmpl(templateText, vm);
                    ko.applyBindings(vm, templated.get(0));
                    //$('.viewmodel', templated).link(vm, vm.linkOptions);
                    callback(new view(templated, vm));
                }
                else if (view) {
                    callback(new view($(templateText))); /* TODO: wrap in jquery necessary ? */
                }
                else {
                    callback({ view: $(templateText) });
                }
            });
        }
    };

    return new presenter();
});