/// <reference path="../Scripts/require.js" />
/// <reference path="../Scripts/jquery-1.6.1-vsdoc.js" />
/// <reference path="../Scripts/jquery.tmpl.js" />
/// <reference path="../Scripts/knockout-1.2.1.debug.js" />
/// <reference path="../Scripts/knockout.mapping-latest.debug.js" />


define(['knockout', 'lib/jquery.tmpl'], function () {
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
					$.extend(vm,ko.mapping.fromJS(model));
					var templated = $.tmpl(templateText, vm);
					//$('.viewmodel', templated).link(vm, vm.linkOptions);
					callback(new view(templated, vm));
				}
				else {
					callback(new view($(templateText))); /* TODO: wrap in jquery necessary ? */
				}
			});
		}
	};

	return new presenter();
});