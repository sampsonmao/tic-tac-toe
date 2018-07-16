const Player = function (name, color) {
    const markBox = function(e) {
         e.target.style.backgroundColor = color
         GameBoard.board[e.target.dataset.gridnum] = name
    }
    return {markBox}
}

//Initalize gameboard
const GameBoard = (function() {
    let board = new Array(9)
    //Creates 9x9 grid
    let gameboard
    for (let i = 0; i<9; i++) {
        gameboard = document.getElementById("game-board")
        panel = document.createElement("button")
        panel.setAttribute('data-gridnum', i)
        panel.addEventListener("click", Player.markBox)
        gameboard.appendChild(panel)
    }
    return{board, gameboard}  
})()

let playerOne, playerTwo
const makePlayers = function() {
    let playerOneName = document.getElementById('player-one').value
    let playerTwoName = document.getElementById('player-two').value
    playerOne = Player(playerOneName, 'blue')
    playerTwo = Player(playerTwoName, 'purple')
}

const playGame = function(playerOne, playerTwo) {

}


//create player with factory from DOM
//call player.markbox on their turn
//create object that alternates turns

