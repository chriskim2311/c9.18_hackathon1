$(document).ready(buildGameBoard);

function buildGameBoard(){
    console.log('game board');
    var boardSize = {row: 8, column: 8};
    var game_Board = $('.gameBoard');
    for(var rowIndex=0; rowIndex < 8; rowIndex++){
        var row = $('<div>').addClass('disc');
        $("body").append(row);
        for(var columnIndex=0; columnIndex < 8; columnIndex++){
            var column = $("<div>").addClass("disc");
            row.append(column);
        }
    }
}


