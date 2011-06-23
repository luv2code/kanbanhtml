/// <reference path="../../Scripts/require.js" />

define(['services/kanban'], function (kanbanService) {
	var viewModel = function () {
		//this.id = 'stickynote' + (new Date()).getTime();
	};
	viewModel.prototype = {
		Text: '',
		Title: '',
		ZIndex: 0,
		Id: '',
		X: 0,
		Y: 0,
		Width: 0,
		Height: 0,
		updatePosition: function (position) {
			this.X = position.left;
			this.Y = position.top;
		},
		updateSize: function (width, height) {
		}
	};
	return viewModel;
});