/// <reference path="../../Scripts/require.js" />
/// <reference path="../../Scripts/jquery-1.6.1-vsdoc.js" />
/// <reference path="../../Scripts/jquery.datalink.js" />

define(['services/messenger', 'viewmodels/stickynoteboardViewModel', 'text!views/stickynoteboardView.tmpl.htm'], function (messenger) {
	var stickynoteboard = function (view, viewmodel) {
		var $this = this;
		this.view = view;
		this.viewModel = viewmodel;
		$(function () {
			$('button[name="clickHere"]', $this.view).click(function () {
				$this.viewModel.createStickyNote(function (stickyNote) {
					stickyNote.viewModel.ZIndex($this.viewModel.getNextZIndex());
					stickyNote.view.appendTo($this.view);
					stickyNote.view.css('position', 'absolute');
				});
			});
		});
		messenger.subscribe('bring-to-front', function (view) {
			var currentIndex = view.viewModel.ZIndex();
			if (currentIndex < $this.viewModel.lastZIndex())
				view.viewModel.ZIndex($this.viewModel.getNextZIndex());
			//			var currentIndex = view.view.css('z-index');
			//			if (currentIndex < $this.viewModel.lastZIndex)
			//				view.view.css('z-index', $this.viewModel.getNextZIndex());
			ko.applyBindings(view.viewModel, view.view.get(0));
			ko.applyBindings($this.viewModel, $('.board-header', $this.view).get(0));
		});
	}
	return stickynoteboard;
});