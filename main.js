


































































































var currentPlayer = black;
var gameBoardArray = [];



function checkPossibleMoves(currentDiscs, currentPlayer) {
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

function findOppositeColor() {

    var currentDiscs = [];

    for(i = 0; i < gameBoardArray.length; i++) {
        for(j = 0; j < gameBoardArray.length; j++ ) {
            if (currentPlayer === black) {
                if(gameBoardArray[i][j] === $(".container").class('white')) {
                    currentDiscs.push(gameBoardArray[i][j])
                }
                else {
                    continue
                }
            }

            if (currentPlayer === white) {
                if(gameBoardArray[i][j] === $(".container").class('black')) {
                    currentDiscs.push(gameBoardArray[i][j])
                }
                else {
                    continue
                }

            }
        }
    } return currentDiscs;
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