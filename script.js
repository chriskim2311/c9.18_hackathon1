$(document).ready(initializeApp);

function initializeApp(){
    makeBoardArray();
    checkPossibleMoves();
    findOppositeColor();

}

function makeBoardArray(){
    console.log('game board');
    var row = $(".row");
    for(var rowIndex=0; rowIndex < row.length; rowIndex++){
        var container = $(row[rowIndex]).find(".container");
        gameBoardArray.push(container);
    }
}


