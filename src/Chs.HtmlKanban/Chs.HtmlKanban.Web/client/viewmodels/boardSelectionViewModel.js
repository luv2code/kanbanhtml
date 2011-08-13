define(['presenter', 'services/kanban'], function (presenter, kanbanService) {
    var viewModel = function () {
        kanbanService.listBoards(0, 0, '', function (data) {
            this.boardList = data;
        });
    };
    viewModel.prototype = {
        boardList : [],
        createBoard: function () {
        },
        refreshList: function () {
        },
        newBoardName: ''
    }; 

    return viewModel;
});