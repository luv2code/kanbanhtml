/// <reference path="../../Scripts/require.js" />

define(['presenter'], function (presenter) {
    var viewModel = function () {
    }
    viewModel.prototype = {
        createStickyNote : function (callback) {
            presenter.createForm('stickynote', function(view) {
                //add view.viewModel to the collection on the board.
                //do anything else to the sticky.
                view.viewModel.text = "Hello"
                if(callback) callback(view);
            });
        }
    };
    return viewModel;
});