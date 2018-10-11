$(document).ready(initializeApp);

function initializeApp(){
    makeBoardArray();
    findOppositeColor();
    checkPossibleMoves();

}
var playerBlack = true;
var gameBoardArray = [];
var currentDiscs = [];



function makeBoardArray(){
    console.log('game board');
    var row = $(".row");
    for(var rowIndex=0; rowIndex < row.length; rowIndex++){
        var container = $(row[rowIndex]).find(".container");
        gameBoardArray.push(container);
        console.log(gameBoardArray)
    }
}


function findOppositeColor() {
    for(var yIndex = 0; yIndex < gameBoardArray.length; yIndex++) {
        for(var xIndex = 0; xIndex < gameBoardArray.length; xIndex++ ) {
            if (playerBlack === true) {
                if(gameBoardArray[yIndex][xIndex] === $(".container").hasClass('white')) {
                    currentDiscs.push(gameBoardArray[yIndex][xIndex])
                }
                else {
                    continue;
                }
            }

            if (playerBlack === false) {
                if(gameBoardArray[yIndex][xIndex] === $(".container").hasClass('black')) {
                    currentDiscs.push(gameBoardArray[yIndex][xIndex])
                }
                else {
                    continue;
                }

            }
        } return currentDiscs;
    }

    console.log(currentDiscs)

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
            if(cordXY === !$(".container").class('white') && !$(".container").class('black')) {
                neighborCells.push(cordXY)
            }
                }
        }
    }
    console.log(neighborCells)
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

function