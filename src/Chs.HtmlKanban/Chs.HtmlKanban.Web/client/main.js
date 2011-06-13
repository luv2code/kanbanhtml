/// <reference path="../Scripts/require.js" />
/// <reference path="../Scripts/jquery-1.6.1-vsdoc.js" />
/// <reference path="../Scripts/jquery.datalink.js" />
/// <reference path="../Scripts/jquery.tmpl.js" />

require(['services/messenger', 'lib/jquery.datalink', 'lib/jquery.tmpl'], function (messenger) {
    var sayHello = function (data) {
        alert(data);
    };
    messenger.subscribe('hello', sayHello);

    $('<p>${name}</p>').tmpl({ name: 'Matt' }).appendTo('#main');
    $(function () {
        $(document).click(function () {
            messenger.publish('hello', 'hello world');
            messenger.unsubscribe('hello', sayHello);
        });
    });
});