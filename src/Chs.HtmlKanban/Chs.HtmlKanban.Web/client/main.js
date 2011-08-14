/// <reference path="../Scripts/require.js" />
/// <reference path="../Scripts/jquery-1.6.1-vsdoc.js" />
/// <reference path="../Scripts/jquery.datalink.js" />
/// <reference path="../Scripts/jquery.tmpl.js" />
define('kanban-config', [], {
	baseUrl: ''
});
require(['presenter'], function (presenter) {

	require.ready(function () {
		var boardSelection = presenter.createForm('boardSelection', function (boardSelection) {
			boardSelection.view.appendTo('#main');
		});
		//        var board = presenter.createForm('stickynoteboard', function (board) {
		//            board.view.appendTo('#main');
		//        });
	});
});