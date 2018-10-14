$(document).ready(initializeApp);

function initializeApp(){
    determineValidMove();

}


function selectValidMove() {
    var directions = [
        {x: -1, y: -1}, //0
        {x: -1, y: 0}, //1
        {x: -1, y: 1}, //2
        {x: 0, y: -1}, //3
        {x: 0, y: 1},  //4
        {x: 1, y: -1}, //5
        {x: 1, y: 0},  //6
        {x: 1, y: 1}
    ];

    var gameboard = [
        //0   1  2  3
        ['', '', '', ''],   //0
        ['?', 'W', 'B', ''],//1
        ['', 'B', 'W', ''], //2
        ['', '', '', ''],   //3
    ];


}

var startPosition = [2,2];
var currentPlayerColor = 'black';
var oppositePlayerColor = 'white';

//     START    PLAYERCOLOR    OPPOSITECOLOR
//checkForChipsToFlip([1,0], 'white', 'black')

//checkForChipsToFlip(startPosition, currentPlayerColor, oppositePlayerColor);

//  3 parameters             [2,2], 'black'    , 'white'
function checkForChipsToFlip(start, playerColor, oppositeColor){ //start: [2,2]
    var moveChips = [];
    for(var directionI =0; directionI<directions.length; directionI++){ //directionI = 6
        var currentDirection = directions[directionI];
        var nextMove = {
            x: start[1] + currentDirection.x,   //0 + 1 = 1
            y: start[0] + currentDirection.y    //1 + 0 = 1
        };
        var moveResult = getValueFromGameboard( nextMove.x, nextMove.y ); //false
        //we are black
        //B, W, '', undefined
        var possibleChips = []; //[ {x:1,y:1}]
        if(  moveResult === oppositeColor){  //moveResult='B', oppositeColor='B'
            while( getValueFromGameboard( nextMove.x, nextmove.y) === oppositeColor){
                possibleChips.push( nextMove );
                nextMove.x += currentDirection.x; // 1 + 1 = 2
                nextMove.y += currentDirection.y; // 1 + 0 = 1
            }
            if(getValueFromGameboard( nextMove.x, nextmove.y) === playerColor){
                //we make the sandwich
                moveChips.push( {start: start, chipsToFlip: possibleChips });
            }
        }
    }

}


function getValueFromGameboard( x, y){

    if(gameboard[y]===undefined){
        return false;
    } else if(gameboard[y][x]===undefined){
        return false;
    } else {
        return gameboard[y][x];
    }
}



