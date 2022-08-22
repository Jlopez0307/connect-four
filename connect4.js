/** Connect Four
 *
 * Player 1 and 2 alternate turns. On each turn, a piece is dropped down a
 * column until a player gets four-in-a-row (horiz, vert, or diag) or until
 * board fills (tie)
 */

const WIDTH = 7;
const HEIGHT = 6;

let currPlayer = 1; // active player: 1 or 2

//Fills in board with values of width and height
//Is there a difference with doing this? instead of pushing from a function?
// const board = new Array(WIDTH).fill().map(() => new Array(HEIGHT).fill()); // array of rows, each row is array of cells  (board[y][x])
const board = []
// console.log(board)

/** makeBoard: create in-JS board structure:
 *    board = array of rows, each row is array of cells  (board[y][x])
 */

function makeBoard() {
  // TODO: set "board" to empty HEIGHT x WIDTH matrix array
  for (let y = 0; y < HEIGHT; y++) {
    board.push(Array.from({length: WIDTH}));

  }
  // console.log(board)
}

/** makeHtmlBoard: make HTML table and row of column tops. */

function makeHtmlBoard() {
  // TODO: get "htmlBoard" variable from the item in HTML w/ID of "board"
  const htmlBoard = document.getElementById('board');
  // TODO: add comment for this code

  //creates the top row of the board
  const top = document.createElement("tr");

  //Sets the id of the top row
  top.setAttribute("id", "column-top");

  //Adds click event listener in each td in the top row of the board
  top.addEventListener("click", handleClick);

  //loops over the width array
  for (let x = 0; x < WIDTH; x++) {

    //Creates the cells of the board
    const headCell = document.createElement("td");
    headCell.setAttribute("id", x);

    //appends it to the row
    top.append(headCell);

  }
  //appends to the board
  htmlBoard.append(top);

  // TODO: add comment for this code
  //Loops over board
  for (let y = 0; y < HEIGHT; y++) {
    //creates a row based on HEIGHT variable
    const row = document.createElement("tr");

    //loops over rows
    for (let x = 0; x < WIDTH; x++) {

      //creates td based on WIDTH variable
      const cell = document.createElement("td");

      //sets id starting at 0 and incrementing up by 1 to each td in the table
      cell.setAttribute("id", `${y}-${x}`);

      //Appends cells to rows
      row.append(cell);
    }
    //Appends rows to bord
    htmlBoard.append(row);
  }
}

/** findSpotForCol: given column x, return top empty y (null if filled) */

function findSpotForCol(x) {
  // TODO: write the real version of this, rather than always returning 0
  for(let y = HEIGHT - 1; y >= 0; y--){

   if(!board[y][x]){
    return y;
   }
  }
  return null
}

/** placeInTable: update DOM to place piece into HTML table of board */

function placeInTable(y, x) {
  // TODO: make a div and insert into correct table cell

  //Creates div for game piece
  const gamePiece = document.createElement('div');
  //Sets gamePiece class
  gamePiece.classList.add('piece', 'player-1');
  

  //If the current player is not player 1, removes the player-1 class and adds the player 2 class to switch gamePiece colors
  if(currPlayer !== 1){
    gamePiece.classList.remove('player-1');
    gamePiece.classList.add('player-2')
  }

  const placeInCell = document.getElementById(`${y}-${x}`)
  placeInCell.append(gamePiece);

}

/** endGame: announce game end */

function endGame(msg) {
  // TODO: pop up alert message
  alert(msg)
}

/** handleClick: handle click of column top to play piece */


function handleClick(evt) {
  // get x from ID of clicked cell
  const x = +evt.target.id;
  // console.log(x);

  // get next spot in column (if none, ignore click)
  const y = findSpotForCol(x);
  if (y === null) {
    return;
  }

  // place piece in board and add to HTML table
  // TODO: add line to update in-memory board
  board[y][x] = currPlayer
  placeInTable(y, x);

  // check for win
  if (checkForWin()) {
    return endGame(`Player ${currPlayer} won!`);
  }

  // check for tie
  // TODO: check if all cells in board are filled; if so call, call endGame
  //Checks if EVERY cell, in EVERY row in the array has a value, if thats true, 
  //return endGame
  if(board.every(row => row.every(cell => cell))){
    console.log(board);
    return endGame(`Its a Tie!!`)
  }

  // switch players
  // TODO: switch currPlayer 1 <-> 2
  if(currPlayer === 1){
    currPlayer++
  }else{
    currPlayer--
  }
  // console.log(currPlayer)
}

/** checkForWin: check board cell-by-cell for "does a win start here?" */

function checkForWin() {
  function _win(cells) {
    // Check four cells to see if they're all color of current player
    //  - cells: list of four (y, x) cells
    //  - returns true if all are legal coordinates & all match currPlayer

    return cells.every(
      //Begins checking values of arrays
      ([y, x]) =>
        //checks if y is greater than or equal to zero
        y >= 0 &&
        //Checks if y is less than the HEIGHT variable
        y < HEIGHT &&
        //Checks if x is greater than or equal to zero
        x >= 0 &&
        //Checks if x is greater than the WIDTH variable
        x < WIDTH &&
        //Checks what player is placing the current piece
        board[y][x] === currPlayer
    );
  }

  // TODO: read and understand this code. Add comments to help you.
  //Loops over height
  for (let y = 0; y < HEIGHT; y++) {
    //loops over length
    for (let x = 0; x < WIDTH; x++) {
      //Variable for horizontal cells
      const horiz = [[y, x], [y, x + 1], [y, x + 2], [y, x + 3]];
      //Variable for vertical cells
      const vert = [[y, x], [y + 1, x], [y + 2, x], [y + 3, x]];
      //Diagonal right cells
      const diagDR = [[y, x], [y + 1, x + 1], [y + 2, x + 2], [y + 3, x + 3]];
      //Diagonal left cells
      const diagDL = [[y, x], [y + 1, x - 1], [y + 2, x - 2], [y + 3, x - 3]];
      //Uses the _win function to check if four cells are the same color as the current player
      //in every direction. 
      if (_win(horiz) || _win(vert) || _win(diagDR) || _win(diagDL)) {
        return true;
      }
    }
  }
}

makeBoard();
makeHtmlBoard();
