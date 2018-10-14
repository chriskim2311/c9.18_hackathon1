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
    $(".reset").click(gameReset);
    $(".container").click(makeMove);
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
    for (var currentI = 0; currentI < currentDiscs.length; currentI++) {  //Changed variable names
        var discPosition = currentDiscs[currentI];

        var coordinateY = parseInt(discPosition[0]);
        var coordinateX = parseInt(discPosition[1]);

        for (var column = -1; column < 2; column++) {
            for (var row = -1; row < 2; row++) {
                var cordY = coordinateY + (column);
                var cordX = coordinateX + (row);
                if (cordY > -1 && cordX > -1) {
                    if (!$(gameBoardArray[cordY][cordX]).find(".disc").hasClass('white') && !$(gameBoardArray[cordY][cordX]).find(".disc").hasClass('black')) {

                        var neighborCoordinates = [cordY, cordX];
                        neighborCells.push(neighborCoordinates)
                    }
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
                    if (cordY > -1 && cordX > -1) {
                        if ($(gameBoardArray[cordY][cordX]).find(".disc").hasClass('white')) {

                            while (cordY > -1 && cordX > -1) {
                                if ($(gameBoardArray[cordY][cordX]).find(".disc").hasClass('black')) {
                                    var validCoordinates = [discCoordinateY, discCoordinateX];
                                    validCells.push(validCoordinates);
                                    $(gameBoardArray[discCoordinateY][discCoordinateX]).addClass('highlight');
                                }else if (!$(gameBoardArray[cordY][cordX]).find(".disc").hasClass('white')) {
                                    break;
                                }
                                cordY += column;
                                cordX += row;
                                // $(".testing").removeClass("testing");
                                // var currentSquare = $(gameBoardArray[cordY][cordX]);
                                // currentSquare.addClass("testing");
                            }
                        }
                    }
                }
                else {
                    if (cordY > -1 && cordX > -1) {
                        if ($(gameBoardArray[cordY][cordX]).find(".disc").hasClass('black')) {
                            while (cordY > -1 && cordX > -1) {
                                if ($(gameBoardArray[cordY][cordX]).find(".disc").hasClass('white')) {
                                    var validCoordinates = [discCoordinateY, discCoordinateX];
                                    validCells.push(validCoordinates);
                                    $(gameBoardArray[discCoordinateY][discCoordinateX]).addClass('highlight');
                                    console.log(validCells)
                                }else if (!$(gameBoardArray[cordY][cordX]).find(".disc").hasClass('black')) {
                                    break;
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

function makeMove() {
    // var selectedBox = $(event.currentTarget);3
    var cordY = parseInt($(event.currentTarget).children().attr('row'));
    var cordX = parseInt($(event.currentTarget).children().attr('col'));
    if(!$(event.currentTarget).hasClass("highlight")) {
        return;
    }
    if (playerBlack) {
        for (var column = -1; column < 2; column++) {
            for (var row = -1; row < 2; row++) {
                var newCordY = cordY + (column);
                var newCordX = cordX + (row);
                // $(".testing").removeClass("testing");
                // var currentSquare = $(gameBoardArray[newCordY][newCordX]);
                // currentSquare.addClass("testing");
                if ((newCordY > -1 && newCordY < gameBoardArray.length - 1 && newCordX > -1 && newCordX < gameBoardArray.length - 1)) {
                    if ($(gameBoardArray[newCordY][newCordX]).find(".disc").hasClass('white')) {
                        while (newCordY > -1 && newCordY < gameBoardArray.length - 1 && newCordX > -1 && newCordX < gameBoardArray.length - 1) {

                            if ($(gameBoardArray[newCordY][newCordX]).find(".disc").hasClass('white')) {
                                $(gameBoardArray[newCordY][newCordX]).addClass('tag');
                                newCordY += column;
                                newCordX += row;
                            }
                            if ($(gameBoardArray[newCordY][newCordX]).find(".disc").hasClass('black')) {
                                // $(".testing").removeClass("testing");
                                // var currentSquare = $(gameBoardArray[newCordY][newCordX]);
                                // currentSquare.addClass("testing");
                                $(".tag").find(".disc").removeClass('white');
                                $(".tag").find(".disc").addClass('black');
                                $(gameBoardArray[cordY][cordX]).find(".disc").addClass('black');
                                $(".container").removeClass('highlight');
                                $('.container').removeClass('tag');
                                break;
                            }
                            else if (!$(gameBoardArray[newCordY][newCordX]).find(".disc").hasClass('white')) {
                                $('.container').removeClass('tag');
                                break;
                            }
                        }
                    }
                }
            }
        }
        changeCurrentPlayer()
    }else {
        for (var column = -1; column < 2; column++) {
            for (var row = -1; row < 2; row++) {
                var newCordY = cordY + (column);
                var newCordX = cordX + (row);
                if ((newCordY > -1 && newCordY < gameBoardArray.length - 1 && newCordX > -1 && newCordX < gameBoardArray.length - 1)) {
                    if ($(gameBoardArray[newCordY][newCordX]).find(".disc").hasClass('black')) {
                        while (newCordY > -1 && newCordY < gameBoardArray.length - 1 && newCordX > -1 && newCordX < gameBoardArray.length - 1) {
                            if ($(gameBoardArray[newCordY][newCordX]).find(".disc").hasClass('black')) {
                                $(gameBoardArray[newCordY][newCordX]).addClass('tag');
                                newCordY += column;
                                newCordX += row;
                            }
                            if ($(gameBoardArray[newCordY][newCordX]).find(".disc").hasClass('white')) {
                                $(".tag").find(".disc").removeClass('black');
                                $(".tag").find(".disc").addClass('white');
                                $(gameBoardArray[cordY][cordX]).find(".disc").addClass('white');
                                $(".container").removeClass('highlight');
                                $('.container').removeClass('tag');
                                break;
                            }else if (!$(gameBoardArray[newCordY][newCordX]).find(".disc").hasClass('black')) {
                                $('.container').removeClass('tag');
                                break;
                            }
                        }
                    }
                }
            }
        }
        changeCurrentPlayer();
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
    $(".container").removeClass('white black tag highlight');
    $(".container").find(".disc").removeClass('white black tag highlight');
    playerBlack = true;
    defaultPieces();
    findOppositeColor();
    checkPossibleMoves();
    totalDiscCount();
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
        $(".arrow1").show("arrow1");
        $(".arrow2").hide("arrow2")
    } else {
        $(".arrow2").show("arrow1");
        $(".arrow1").hide("arrow1")
    }
}

function changeCurrentPlayer() {
    totalDiscCount();
    currentDiscs = [];
    neighborCells = [];
    validCells = [];
    if (playerBlack) {
        playerBlack = false;
        displayCurrentPlayer();
        findOppositeColor();
        checkPossibleMoves();
    } else {
        playerBlack = true;
        displayCurrentPlayer();
        findOppositeColor();
        checkPossibleMoves();
    }
}