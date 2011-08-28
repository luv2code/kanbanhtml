/// <reference path="../lib/knockout.js" />

define(['presenter', 'services/kanban'], function (presenter, kanbanService) {
    var viewModel = function () {
        kanbanService.listBoards(0, 0, '', function (data) {
            this.boardList = data;
        });
    };
    viewModel.prototype = {
        boards: [],
        createBoard: function () {
            alert(this.newBoardName());
            if (this.newBoardName().length < 1) {
                alert("Board Name must not be empty.");
            } else {

            }
        },
        refreshList: function () {
        },
        newBoardName: 'sdfg'
    };

    return viewModel;
});