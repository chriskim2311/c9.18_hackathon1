$(document).ready(initializeApp);

function initializeApp() {
    makeBoardArray();
    defaultPieces();
    findOppositeColor();
    checkPossibleMoves();
    defineWin();
    displayCurrentPlayer();
    totalDiscCount();
    applyClickHandler();
}

function applyClickHandler() {
    $(".reset").click(gameReset)
}

var playerBlack = true;
var gameBoardArray = [];
var currentDiscs = [];
var neighborCells = [];
var validCells = [];


function makeBoardArray() {
    var row = $(".row");
    for (var rowIndex = 0; rowIndex < row.length; rowIndex++) {
        var container = $(row[rowIndex]).find(".container");
        gameBoardArray.push(container);
    }
}

function findOppositeColor() {
    for (var yIndex = 0; yIndex < gameBoardArray.length; yIndex++) {
        for (var xIndex = 0; xIndex < gameBoardArray.length; xIndex++) {
            if (playerBlack) {
                if ($(gameBoardArray[yIndex][xIndex]).find(".disc").hasClass('white')) {
                    var discCoordinates = [yIndex, xIndex];
                    currentDiscs.push(discCoordinates);
                }
            } else {
                if ($(gameBoardArray[yIndex][xIndex]).find(".disc").hasClass('black')) {
                    var discCoordinates = [yIndex, xIndex];
                    currentDiscs.push(discCoordinates)
                }
            }
        }
    }
}

function checkPossibleMoves() {
    for (var i = 0; i < currentDiscs.length; i++) {
        var discPosition = currentDiscs[i];

        var coordinateY = parseInt(discPosition[0]);
        var coordinateX = parseInt(discPosition[1]);

        for (var column = -1; column < 2; column++) {
            for (var row = -1; row < 2; row++) {
                var cordY = coordinateY + (column);
                var cordX = coordinateX + (row);
                if (!$(gameBoardArray[cordY][cordX]).find(".disc").hasClass('white') && !$(gameBoardArray[cordY][cordX]).find(".disc").hasClass('black')) {
                    var neighborCoordinates = [cordY, cordX];
                    neighborCells.push(neighborCoordinates)
                }
            }
        }
    }

    for (var i = 0; i < neighborCells.length; i++) {
        var potentialPosition = neighborCells[i];
        var discCoordinateY = parseInt(potentialPosition[0]);
        var discCoordinateX = parseInt(potentialPosition[1]);
        for (var column = -1; column < 2; column++) {
            for (var row = -1; row < 2; row++) {
                var cordY = discCoordinateY + (column);
                var cordX = discCoordinateX + (row);
                if (playerBlack) {
                    if (cordY > -1 && cordY < gameBoardArray.length - 1 && cordX > -1 && cordX < gameBoardArray.length - 1) {
                        if ($(gameBoardArray[cordY][cordX]).find(".disc").hasClass('white')) {
                            while (cordY > -1 && cordY < gameBoardArray.length - 1 && cordX > -1 && cordX < gameBoardArray.length - 1) {
                                if ($(gameBoardArray[cordY][cordX]).find(".disc").hasClass('black')) {
                                    var validCoordinates = [discCoordinateY, discCoordinateX];
                                    validCells.push(validCoordinates);
                                    $(gameBoardArray[discCoordinateY][discCoordinateX]).addClass('highlight');
                                }
                                cordY += column;
                                cordX += row;
                            }
                        }
                    }
                }
                else {
                    if (cordY > -1 && cordY < gameBoardArray.length - 1 && cordX > -1 && cordX < gameBoardArray.length - 1) {
                        if ($(gameBoardArray[cordY][cordX]).find(".disc").hasClass('black')) {
                            while (cordY > -1 && cordY < gameBoardArray.length - 1 && cordX > -1 && cordX < gameBoardArray.length - 1) {
                                if ($(gameBoardArray[cordY][cordX]).find(".disc").hasClass('white')) {
                                    var validCoordinates = [discCoordinateY, discCoordinateX];
                                    validCells.push(validCoordinates);
                                    $(gameBoardArray[discCoordinateY][discCoordinateX]).addClass('highlight');
                                    console.log(validCells)
                                }
                                cordY += column;
                                cordX += row;
                            }
                        }
                    }
                }
            }
        }
    }
}

function winCondition() {
    var blackCells = $(".black").length;
    var whiteCells = $(".white").length;
    if (blackCells > whiteCells) {
        alert("Player B Wins!");
    } else {
        alert("Player W Wins!");
    }
}

function gameReset() {
    $(".container").removeClass("white black highlight");
    initializeApp();
}

function totalDiscCount() {
    var blackCells = $(".black").length;
    var whiteCells = $(".white").length;
    $(".value1 > .count").text(blackCells);
    $(".value2 > .count").text(whiteCells);
}

function defaultPieces() {
    $('div[row=3][col=3]').addClass("white");
    $('div[row=3][col=4]').addClass("black");
    $('div[row=4][col=3]').addClass("black");
    $('div[row=4][col=4]').addClass("white");
}

function defineWin() {
    var blackCells = $(".black").length;
    var whiteCells = $(".white").length;
    if (blackCells + whiteCells === 64) {
        winCondition();
    }
}

function displayCurrentPlayer() {
    if (playerBlack) {
        $(".playerIndicator1").show("blackTurn");
        $(".arrow2").hide("arrow2")
    } else {
        $(".playerIndicator2").show("whiteTurn");
        $(".arrow1").hide("arrow1")
    }
}