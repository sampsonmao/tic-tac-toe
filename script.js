const Player = function (name, color) {
    const markBox = function(e) {
         e.target.style.backgroundColor = color /*player symbol*/
         GameBoard.board[e.target.dataset.gridnum] = name
    }
    return {}
}

const GameBoard = (function() {
    let board = new Array(9)
    //Creates 9x9 grid
    for (let i = 0; i<9; i++) {
        let gameboard = document.getElementById("game-board")
        let panel = document.createElement("button")
        panel.setAttribute('data-gridnum', i)
        panel.addEventListener("click", Player.markBox)
        gameboard.appendChild(panel)
    }
    return{board}  
})()

const PlayGame = function() {
    
}



