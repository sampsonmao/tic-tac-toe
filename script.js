const Player = function (name, symbol) {
    let didWin = 'no'
    return{name, didWin, symbol}
}

let playerOne, playerTwo
const createPlayers = function() {
    document.getElementById('game-board').style.display = 'flex';
    playerOne = Player(document.getElementById('player-one').value, "X")
    playerTwo = Player(document.getElementById('player-two').value, "O")
    let form = document.getElementById('form-container')
    form.style.display = 'none'
}

const replay = function() {
    //Toggles overlay and form
    document.getElementById('form-container').style.display = 'flex'
    document.getElementById('win-overlay').style.display = 'none';
    document.getElementById('game-board').style.display = 'none';
    //Clears array, turn, and board
    GameBoard.board = new Array(9)
    GameBoard.turn = 0
    GameBoard.arrayIndex = 0
    let index = 0
    for (let i of GameBoard.board) {
        document.getElementsByClassName("tiles")[index].textContent = ""
        index++
    }
}

const displayWinner = function(winner) {
    if (winner === 'tie') {
        document.getElementById('win-text').textContent = `It's a tie!`;
    } else {
        document.getElementById('win-text').textContent = `${winner} wins!`;
    }
    document.getElementById('win-overlay').style.display = 'flex';
}

//Checks if 3 in a row
const checkWin = function(playerObj) {
    for (let i=0, j=0; i<6, j<2; i=i+3, j++) {
        let rowValues = [GameBoard.board[i], GameBoard.board[i+1], GameBoard.board[i+2]]
        let colValues = [GameBoard.board[j], GameBoard.board[j+3], GameBoard.board[j+6]]
        let diagValueDown = [GameBoard.board[i+0], GameBoard.board[i+4], GameBoard.board[i+8]]
        let diagValueUp = [GameBoard.board[i+2], GameBoard.board[i+4], GameBoard.board[i+6]]
        if (rowValues.every(x => x === playerObj.symbol)) {
            displayWinner(playerObj.name)
            playerObj.didWin = 'yes'
        } else if (colValues.every(x => x === playerObj.symbol)) {
            displayWinner(playerObj.name)
            playerObj.didWin = 'yes'
        } else if (diagValueDown.every(x => x === playerObj.symbol)) {
            displayWinner(playerObj.name)
            playerObj.didWin = 'yes'
        } else if (diagValueUp.every(x => x === playerObj.symbol)) {
            displayWinner(playerObj.name)
            playerObj.didWin = 'yes'
        } else if ((GameBoard.turn === 9) && (playerObj.didWin === 'no')) {
            displayWinner('tie')
        }
    }
}

const render = function (e) {
    //Add marks on gameboard
    let position = e.target.dataset.gridnum
    if ((GameBoard.turn % 2 === 0) && (GameBoard.board[position] === undefined) && (playerTwo.didWin === 'no')) {
        input = playerOne.symbol
        GameBoard.turn++
        GameBoard.board[position] = input
        checkWin(playerOne)
    } else if ((GameBoard.turn % 2 != 0) && (GameBoard.board[position] === undefined) && (playerOne.didWin === 'no'))  {
        input = playerTwo.symbol
        GameBoard.turn++
        GameBoard.board[position] = input
        checkWin(playerTwo) 
    }

    //looks at GameBoard.board and repopulate tiles with its contents
    let index = 0
    for (let i of GameBoard.board) {
        document.getElementsByClassName("tiles")[index].textContent = i
        index++
    }
}
   
//Initalizes a 9x9 gameboard
const GameBoard = (function() {
    let board = new Array(9)
    let turn = 0
    let arrayIndex = 0
    for (let i of board) {
        let gameboard = document.getElementById("game-board")
        panel = document.createElement("button")
        panel.textContent = i
        panel.classList.add("tiles")
        panel.dataset.gridnum = arrayIndex
        arrayIndex++
        panel.addEventListener("click", render)
        gameboard.appendChild(panel)
    }
    return{board, turn}
})()
