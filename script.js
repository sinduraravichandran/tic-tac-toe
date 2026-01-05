const gameController = (function gameController() {

    const players = [];
    let currentPlayerTurn;

    //call this after the two players have been created to set the player turn
    function startGame() {
        currentPlayerTurn = players[0];
        console.log(`It's ${players[0].name} turn`);
    }

    function switchPlayerTurn() {
        if (currentPlayerTurn === players[0]) {
            currentPlayerTurn = players[1];
        } else {
            currentPlayerTurn = players[0];
        }
        console.log(`It's ${players[0].name} turn`);
    }

    function playTurn(playerName, r, c) {
        const playerNameIndex = players.findIndex((item) => item.name === playerName);
        if (gameBoard.gameboard[r][c] === 0) {
            gameBoard.gameboard[r][c] = players[playerNameIndex].token;
        }
        gameBoard.renderBoard();
        switchPlayerTurn();
        
    }


    return {startGame, players, currentPlayerTurn, playTurn, switchPlayerTurn};

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


function createPlayer(name, token) {
    gameController.players.push({name,token});
    console.log(gameController.players);

}




