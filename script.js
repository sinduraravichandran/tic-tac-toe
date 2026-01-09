const gameController = (function gameController() {

    const players = [];
    let currentPlayerTurn;
    const gameOver = 0;

    //call this after the two players have been created to set the player turn
    function startGame() {
        currentPlayerTurn = players[0];
        console.log(`It's ${currentPlayerTurn.name} turn`);
    }

    function getCurrentPlayerTurn() {
        return currentPlayerTurn;
    }

    function switchPlayerTurn() {
        if (currentPlayerTurn === players[0]) {
            currentPlayerTurn = players[1];
        } else {
            currentPlayerTurn = players[0];
        }
        console.log(`It's ${players[0].name} turn`);
    }

    function checkIfWon() {
        const currentPlayerTurnName = currentPlayerTurn.name;

        //if there are three in a row of currentPlayerTurn, then the currentPlayer won
        if ((gameBoard.gameboard[0][0] === currentPlayerTurnName && gameBoard.gameboard[0][1] === currentPlayerTurnName && gameBoard.gameboard[0][2] === currentPlayerTurnName) ||
            (gameBoard.gameboard[1][0] === currentPlayerTurnName && gameBoard.gameboard[1][1] === currentPlayerTurnName && gameBoard.gameboard[1][2] === currentPlayerTurnName) ||
            (gameBoard.gameboard[2][0] === currentPlayerTurnName && gameBoard.gameboard[2][1] === currentPlayerTurnName && gameBoard.gameboard[2][2] === currentPlayerTurnName) ||
            (gameBoard.gameboard[0][0] === currentPlayerTurnName && gameBoard.gameboard[1][0] === currentPlayerTurnName && gameBoard.gameboard[2][0] === currentPlayerTurnName) ||
            (gameBoard.gameboard[0][1] === currentPlayerTurnName && gameBoard.gameboard[1][1] === currentPlayerTurnName && gameBoard.gameboard[2][1] === currentPlayerTurnName) ||
            (gameBoard.gameboard[0][2] === currentPlayerTurnName && gameBoard.gameboard[1][2] === currentPlayerTurnName && gameBoard.gameboard[2][2] === currentPlayerTurnName) ||
            (gameBoard.gameboard[0][0] === currentPlayerTurnName && gameBoard.gameboard[1][1] === currentPlayerTurnName && gameBoard.gameboard[2][2] === currentPlayerTurnName) ||
            (gameBoard.gameboard[2][0] === currentPlayerTurnName && gameBoard.gameboard[1][1] === currentPlayerTurnName && gameBoard.gameboard[0][2] === currentPlayerTurnName) 
    ) {
        console.log(`${currentPlayerTurnName} won!` )
        gameOver = 1;
    }

    }


    function playTurn(playerName, r, c) {
        const playerNameIndex = players.findIndex((item) => item.name === playerName);
        if (gameBoard.gameboard[r][c] === 0) {
            gameBoard.gameboard[r][c] = players[playerNameIndex].name;
        }
        gameBoard.renderBoard();
        checkIfWon()
        
        //if no one won in the last turn, keep playing by switching the player
        if (!gameOver) {
            switchPlayerTurn();
    }
    }   
    return {startGame, players, getCurrentPlayerTurn, playTurn, switchPlayerTurn};

})();

const gameBoard = (function gameBoard() {
    const gameboard = [];
    const rows = 3;
    const columns = 3;

    for (let i=0; i < rows; i++) {
        gameboard[i] = [];
        for (let j=0; j < columns; j++) {
            gameboard[i][j] = 0;
        }
    }

    function renderBoard() {
        console.log(gameboard);
    }

    return {gameboard, renderBoard};
})();


function createPlayer(name) {
    gameController.players.push({name});
    console.log(gameController.players);

}




