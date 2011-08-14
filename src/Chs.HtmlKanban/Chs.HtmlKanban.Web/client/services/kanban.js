/// <reference path="../../Scripts/require.js" />
/// <reference path="../../Scripts/jquery-1.6.1-vsdoc.js" />
define(['kanban-config'], function (config) {
	var Kanban = function () {
		$.extend(true, this, config);
	};
	Kanban.prototype = {
		baseUrl: '',
		createBoard: function (title, callback) {
		},
		listBoards: function (pageIndex, pageSize, searchText, callback) {
			$.getJSON(this.baseUrl + 'Board/List', {}, function (data) {
				if (callback) callback(data);
			});
		},
		createSticky: function (callback) {
			$.getJSON(this.baseUrl + 'Sticky/Create', {}, function (data) {
				if (callback) callback(data);
			});
		},
		saveStickyText: function (id, text, callback) {
			$.post(this.baseUrl + 'Sticky/SaveText', { id: id, text: text }, function (data) {
				if (callback) callback(data);
			}, "json");
		},
		getStickies: function (id, callback) {
			/* called after an existing board is selected. */
		},
		deleteSticky: function (id, callback) {
		}
	};
	return new Kanban();
});