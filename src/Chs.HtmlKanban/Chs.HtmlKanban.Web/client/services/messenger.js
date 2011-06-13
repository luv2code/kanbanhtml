/// <reference path="../../Scripts/require.js" />

define(function () {
    var Messenger = function () { };
    Messenger.prototype = {
        _listeners: { '': [] },
        publish: function (message, data) {
            if (this._listeners[message]) {
                var callbacks = this._listeners[message];
                for (var x = 0; x < callbacks.length; x++)
                    callbacks[x](data);
            };
        },
        subscribe: function (message, callback) {
            this._listeners[message] = this._listeners[message] || [];
            this._listeners[message].push(callback);
        },
        unsubscribe: function (message, callback) {
            this._listeners[message] = this._listeners[message] || [];
            var index = -1;
            for (var x = 0; x < this._listeners[message].length; x++) {
                if (this._listeners[message][x] === callback) {
                    index = x;
                    break;
                }
            }
            if (index > -1) {
                this._listeners[message].splice(index, 1);
            }
        }
    };
    return new Messenger();
});