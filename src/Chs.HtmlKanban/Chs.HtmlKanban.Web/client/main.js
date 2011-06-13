/// <reference path="../Scripts/require.js" />
/// <reference path="../Scripts/jquery-1.6.1-vsdoc.js" />
/// <reference path="../Scripts/jquery.datalink.js" />
/// <reference path="../Scripts/jquery.tmpl.js" />

require(['presenter', 'services/messenger', 'lib/jquery.datalink', 'lib/jquery.tmpl'], function (presenter, messenger) {
    var board = presenter.createForm('stickynoteboard', function (board) {
        board.view.appendTo('#main');
    });
});