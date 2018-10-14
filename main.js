$(document).ready(initializeApp);

function initializeApp(){
    makeBoardArray();
    defaultPieces();
    findOppositeColor();
    checkPossibleMoves();
    defineWin();
    displayCurrentPlayer();
    totalDiscCount();
    applyClickHandler();


}
var playerBlack = true;
var gameBoardArray = [];
var currentDiscs = [];
var neighborCells = [];
var directionArray = [[-1,-1], [1,1], [1,0], [-1,0], [0,-1], [0,1], [-1,1], [1,-1]];
var validCells = [];


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
            if (playerBlack) {
                if($(gameBoardArray[yIndex][xIndex]).find(".disc").hasClass('white')) {
                    var discCoordinates = [yIndex,xIndex];
                    currentDiscs.push(discCoordinates);
                }
            } else {
                if($(gameBoardArray[yIndex][xIndex]).find(".disc").hasClass('black')) {
                    var discCoordinates = [yIndex,xIndex];
                    currentDiscs.push(discCoordinates)
                }
            }
        }
    }
    console.log(currentDiscs)
    // return currentDiscs;


}

function checkPossibleMoves(currentDiscArray, player) {
    // var selectedSquare = event.currentTarget;

    for (i = 0; i < currentDiscs.length; i++) {
        var discPosition = currentDiscs[i];

        var coordinateY = parseInt(discPosition[0]);
        var coordinateX = parseInt(discPosition[1]);

        for (y = -1; y < 2; y++) {
            for (x = -1; x < 2; x++) {
                var cordY = coordinateY + (y);
                var cordX = coordinateX + (x);

                console.log('cordY:', cordY)
                console.log('cordx:', cordX)
                // $('div[row='+ cordX +'][col=' + cordY +']')
                if (!$(gameBoardArray[cordY][cordX]).find(".disc").hasClass('white') && !$(gameBoardArray[cordY][cordX]).find(".disc").hasClass('black')) {
                    var neighborCoordinates = [cordY, cordX];
                    neighborCells.push(neighborCoordinates)
                }

            }
        }
    }


    for (i = 0; i < neighborCells.length; i++) {
        var potentialPosition = neighborCells[i];

        var discCoordinateY = parseInt(potentialPosition[0]);
        var discCoordinateX = parseInt(potentialPosition[1]);

        // for(var directionChangeY = 0; directionChangeY < directionArray.length; directionChangeY++) {
        //     for(var directionChangeX = 0; directionChangeX < directionArray.length; directionChangeX++)
        //     var directions = directionArray[directionChangeY][directionChangeX];
        for (y = -1; y < 2; y++) {
            for (x = -1; x < 2; x++) {
                var cordY = discCoordinateY + (y);
                var cordX = discCoordinateX + (x);


                if (playerBlack) {
                    if (cordY > -1 && cordY < gameBoardArray.length - 1 && cordX > -1 && cordX < gameBoardArray.length - 1) {
                        if ($(gameBoardArray[cordY][cordX]).find(".disc").hasClass('white') === true) {
                            while (cordY > -1 && cordY < gameBoardArray.length - 1 && cordX > -1 && cordX < gameBoardArray.length - 1) {
                                if ($(gameBoardArray[cordY][cordX]).find(".disc").hasClass('black') === true) {
                                    var validCoordinates = [discCoordinateY, discCoordinateX];
                                    validCells.push(validCoordinates);
                                    $(gameBoardArray[discCoordinateY][discCoordinateX]).addClass('highlight');
                                    console.log(validCells)
                                }
                                cordY += y;
                                cordX += x;
                            }
                        }


                    }
                }
                else {
                    if (cordY > -1 && cordY < gameBoardArray.length - 1 && cordX > -1 && cordX < gameBoardArray.length - 1) {
                            if ($(gameBoardArray[cordY][cordX]).find(".disc").hasClass('black') === true) {
                            while (cordY > -1 && cordY < gameBoardArray.length - 1 && cordX > -1 && cordX < gameBoardArray.length - 1) {
                                if ($(gameBoardArray[cordY][cordX]).find(".disc").hasClass('white') === true) {
                                    var validCoordinates = [discCoordinateY, discCoordinateX];
                                    validCells.push(validCoordinates);
                                    $(gameBoardArray[discCoordinateY][discCoordinateX]).addClass('highlight');
                                    console.log(validCells)
                                }
                                cordY += y;
                                cordX += x;
                            }
                        }


                    }
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
    var blackCells = $(".black").length;
    var whiteCells = $(".white").length;
    if(blackCells > whiteCells){
        alert("Player B Wins!");
    }else{
        alert("Player W Wins!");
    }

}

function gameReset() {
    $(".container").removeClass("white black highlight")
    defaultPieces();
    $(".value1 > count").text("0");
    $(".value2 > count").text("0");
}

function totalDiscCount(){
    var blackCells = $(".black").length;
    var whiteCells = $(".white").length;
    $(".value1 > .count").text(blackCells);
    $(".value2 > .count").text(whiteCells);
}

function applyClickHandler(){
    //$(".container").click(selectValidMove);
    $(".reset").click(gameReset);
}


function defaultPieces() {
    $('div[row=3][col=3]').addClass("white");
    $('div[row=3][col=4]').addClass("black");
    $('div[row=4][col=3]').addClass("black");
    $('div[row=4][col=4]').addClass("white");
}

function defineWin (){
    var blackCells = $(".black").length;
    var whiteCells = $(".white").length;
    if(blackCells + whiteCells === 64){
        winCondition();
    }
}

function displayCurrentPlayer() {
    if (playerBlack) {
        $(".playerIndicator1").show("blackTurn");
        $(".playerIndicator2").hide("whiteTurn")
    } else {
        $(".playerIndicator2").show("whiteTurn");
        $(".playerIndicator2").hide("blackTurn")
    }

}