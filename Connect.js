var playerRed = "R";
var playerYellow = "Y";
var currentPlayer = playerRed;

var gameOver = false;
var board;
 

var rows = 6;
var columns = 7;
var currColumns = []; //track the row of the column
//Define the function for the loading page and populate the tiles on the page//

window.onload = function() {
    setGame();   
}

//Define the function//
function setGame() {
    board = [];
    currColumns = [5, 5, 5, 5, 5, 5, 5];

    for (let r= 0; r < rows; r++) {
        let row = [];
        for (let c = 0; c < columns; c++) {
            //JS//
            row.push(' ');

            //HTML//
            let tile = document.createElement("div");
            tile.id = r.toString() + "-" + c.toString();
            tile.classList.add("tile");
            tile.addEventListener("click", setPiece);
            document.getElementById("board").append(tile);
        }
        board.push(row);
    }
}
//Find out the column that was clicked,
// traverse through column of the 2d array and find out the last zero and change it to the player number.
//Check to see if the game is finished 
function setPiece() {
    if (gameOver) {
        return;
    }
    let coordinates = this.id.split("-"); //split will split the string and return the array with 2 values.
    let r = parseInt(coordinates[0]);
    let c = parseInt(coordinates[1]);

    r = currColumns[c];
    if (r < 0) {
        return; 
    }

    board[r][c] = currentPlayer;
    let tile = document.getElementById(r.toString() + "-" + c.toString());
    if (currentPlayer == playerRed) {
        tile.classList.add("red-piece");
        currentPlayer = playerYellow;
    }
    else {
        tile.classList.add("yellow-piece");
        currentPlayer = playerRed;

    }    //Add an array to mark the colomns so it starts at the beginning
r -= 1; // to change the row height
currColumns[c] = r;

checkWinner();
}
// Horizontal//
function checkWinner() {
    for (let r= 0; r < rows; r++) {
        for (let c = 0; c < columns - 3; c++) {
            if (board[r][c] != ' ') {
                if (board[r][c] == board[r][c+1] && board[r][c+1] == board[r][c+2] && board[r][c+2] == board[r][c+3]) {
                    setWinner(r,c);
                    return;
                }
            }
        }  
    }
    //Vertical
    for (let c = 0; c < columns; c++) {
        for (let r =0; r < rows - 3; r++) {
            if (board[r][c] != ' ') {
                if (board[r][c] == board[r+1][c] && board[r+1][c] == board[r+2][c] && board[r+2][c]  == board[r+3][c]) {
                    setWinner(r, c);
                    return;
                }
            }
        }
    }
    //Diagonal
    for (let r = 0; r < rows; r++) {
        for (let c =0; c < columns-3; c++) {
            if (board[r][c] != ' ') {
                if (board[r][c] == board[r+1][c+1] && board[r+1][c+1] == board[r+2][c+2] && board[r+2][c+2] == board[r+3][c+3]) {
                    setWinner(r, c);
                    return;
                }
            }
        }                       
    }
    for (let r = 3; r < rows; r++) {
        for (let c =0; c< columns - 3; c++) {
            if (board[r][c] != ' ') {
                if (board[r][c] == board[r-1][c+1] && board[r-1][c+1] == board[r-2][c+2] && board[r-2][c+2] == board[r-3][c+3]) {
                    setWinner(r, c);
                    return;
                }
            }
        }
    }                      
}
function theWinner(r, c) {
    let winner = document.getElementById("winner");
    if (board[r][c] == playerRed) {
        winner.innerText = "Red is the winner";
    } else {
        winner.innerText = "Yellow is the winner";
    }
    gameOver = true;
}
