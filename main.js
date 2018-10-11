$(document).ready(initializeApp);

function initializeApp(){
    makeBoardArray();
    checkPossibleMoves();
    findOppositeColor();

}
var playerBlack = true;
var gameBoardArray = [];




function makeBoardArray(){
    console.log('game board');
    var row = $(".row");
    for(var rowIndex=0; rowIndex < row.length; rowIndex++){
        var container = $(row[rowIndex]).find(".container");
        gameBoardArray.push(container);
    }
}


function findOppositeColor() {

    var currentDiscs = [];

    for(i = 0; i < gameBoardArray.length; i++) {
        for(j = 0; j < gameBoardArray.length; j++ ) {
            if (playerBlack === true) {
                if(gameBoardArray[i][j] === $(".container").class('white')) {
                    currentDiscs.push(gameBoardArray[i][j])
                }
                else {
                    continue;
                }
            }

            if (playerBlack === false) {
                if(gameBoardArray[i][j] === $(".container").class('black')) {
                    currentDiscs.push(gameBoardArray[i][j])
                }
                else {
                    continue;
                }

            }
        }
    } return currentDiscs;
}

function checkPossibleMoves(currentDiscs, playerBlack) {
    var neighborCells = [];
        // var selectedSquare = event.currentTarget;

    for(i = 0; i < currentDiscs.length; i++){
        var discPosition = currentDiscs[i];
        var coordinateY = parseInt(discPosition.charAt(1));
        var coordinateX = parseInt(discPosition.charAt(0));

            for(y = -1; y < 2; y++){
                for (x = -1; x < 2; x++){
            var cordY = coordinateY + (y);
            var cordX = coordinateX + (x);
            // $('div[row='+ cordX +'][col=' + cordY +']')

            var cordXY = [cordX][cordY];
            if(cordXY === !$(".container").class('white') && !$(".container").class('black') {
                neighborCells.push(cordXY)
            }
                }
        }
    }
}



function makeMove() {

}

function colorFlip() {

}
function playerTurn() {

}

function winCondition() {

}
function gameReset() {

}