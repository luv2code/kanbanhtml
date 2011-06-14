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
        linkOptions: {
            Title: {
                name: "Title",
                convertBack: function (value, source, target) {
                    $(target).text(value);
                }
            },
            Text: {
                convert: function (value, source, target) {
                    target.Text = value;
                    kanbanService.saveStickyText(target.Id, target.Text);
                }
            }
        },
        updatePosition: function (position) {
            //alert(position.left + ' ' + position.top);
        },
        updateSize: function (width, height) {
        }
    };
    return viewModel;
});