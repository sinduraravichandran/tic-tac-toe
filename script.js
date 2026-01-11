//IEFE for controlling the game. All functions for game interactions here
const gameController = (function gameController() {

    const players = [];
    let currentPlayerTurn;
    let gameOver = 0;

    //call this after the two players have been created to set the player turn
    function addPlayer(name) {
        players.push({name});

    }
    
    function startGame() {
        currentPlayerTurn = players[0];
        console.log(`It's ${currentPlayerTurn.name} turn`);    
    }

    function restartGame() {
        players.length = 0;
        gameOver = 0;
        gameBoard.clearBoard();
        console.log('add players and click Start');
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
        console.log(`It's ${currentPlayerTurn.name} turn`);
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
    } else {
        console.log("Game still in play");
    }

    }

    function playTurn(r, c) {
        const playerNameIndex = players.findIndex((item) => item.name === currentPlayerTurn.name);
        if (gameBoard.gameboard[r][c] === 0) {
            gameBoard.gameboard[r][c] = players[playerNameIndex].name;
        } else {
            console.log("invalid turn");
            return;
        }
        checkIfWon();

        //delete after, just for debugging purposes
        console.log(gameBoard.gameboard);
        
        //if no one won in the last turn, keep playing by switching the player
        if (gameOver === 0) {
            switchPlayerTurn();
    }
    }   

    return {startGame, addPlayer, getCurrentPlayerTurn, playTurn, switchPlayerTurn, restartGame};

})();

//all functions for maintaining/updating game board 
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

    function clearBoard() {
        for (let i=0; i<rows; i++) {
            for (let j=0; j<columns; j++) {
                gameboard[i][j] = 0;
            }
        }
    }

    return {gameboard, clearBoard};
})();


//interacting with the DOM
function displayController() {

    const player1UI = document.getElementById("player1-input");
    const player2UI = document.getElementById("player2-input");
    const cellsUI = document.querySelectorAll(".grid-tile");
    const startButtonUI = document.getElementById("start-game-button");
    const resultsUI = document.getElementById("results");


    //bind events + figure out where to call that 
}
