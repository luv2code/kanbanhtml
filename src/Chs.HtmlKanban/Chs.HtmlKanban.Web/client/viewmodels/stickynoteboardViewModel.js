/// <reference path="../../Scripts/require.js" />
/// <reference path="../../Scripts/jquery-1.6.1-vsdoc.js" />

define(['presenter', 'services/kanban'], function (presenter, kanbanService) {
	var viewModel = function () { }
	viewModel.prototype = {
		lastZIndex: 0,
		createStickyNote: function (callback) {
			var $this = this;
			kanbanService.createSticky(function (sticky) {
				presenter.createForm('stickynote', function (stickynote) {
					if (callback) callback(stickynote);
				}, sticky);

			});

		},
		getNextZIndex: function () {
			//$(this).setField('lastZIndex', this.lastZIndex + 1);//TODO: factor out jquery and datalinking references 
			this.lastZIndex(this.lastZIndex() + 1);
			return this.lastZIndex();
		}
	};
	return viewModel;
});