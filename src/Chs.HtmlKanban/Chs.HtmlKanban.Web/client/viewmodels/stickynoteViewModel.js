/// <reference path="../../Scripts/require.js" />

define(function () {
    var viewModel = function () {
        this.text = (new Date()).getTime();
        this.id = 'stickynote' + (new Date()).getTime();
    };
    viewModel.prototype = {
        text: '',
        linkOptions: {
            text: {
                convert: function (value, source, target) {
                    alert('convert fired for : ' + target.id); 
                    return value.toUpperCase(); 
                },
                convertBack: function (value, source, target) {
                    alert('convertBack fired for : ' + source.id); 
                    return value.toLowerCase(); 
                }
            }
        }
    };
    return viewModel;
});