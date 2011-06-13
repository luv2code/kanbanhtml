/// <reference path="../Scripts/require.js" />
/// <reference path="../Scripts/jquery-1.6.1-vsdoc.js" />
/// <reference path="../Scripts/jquery.datalink.js" />
/// <reference path="../Scripts/jquery.tmpl.js" />

require(['services/messenger', 'lib/jquery.datalink', 'lib/jquery.tmpl'], function (messenger) {
    messenger.subscribe('hello', function (data) {
        alert(data);
    });

    $('<p>${name}</p>').tmpl({ name: 'Matt' }).appendTo('#main');
    $(function () {
        $(document).click(function () {
            messenger.publish('hello', 'hello world');
        });
    });
});