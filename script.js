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
        const gameboard = gameBoard.getGameboard();

        //if there are three in a row of currentPlayerTurn, then the currentPlayer won
        if ((gameboard[0][0] === currentPlayerTurnName && gameboard[0][1] === currentPlayerTurnName && gameboard[0][2] === currentPlayerTurnName) ||
            (gameboard[1][0] === currentPlayerTurnName && gameboard[1][1] === currentPlayerTurnName && gameboard[1][2] === currentPlayerTurnName) ||
            (gameboard[2][0] === currentPlayerTurnName && gameboard[2][1] === currentPlayerTurnName && gameboard[2][2] === currentPlayerTurnName) ||
            (gameboard[0][0] === currentPlayerTurnName && gameboard[1][0] === currentPlayerTurnName && gameboard[2][0] === currentPlayerTurnName) ||
            (gameboard[0][1] === currentPlayerTurnName && gameboard[1][1] === currentPlayerTurnName && gameboard[2][1] === currentPlayerTurnName) ||
            (gameboard[0][2] === currentPlayerTurnName && gameboard[1][2] === currentPlayerTurnName && gameboard[2][2] === currentPlayerTurnName) ||
            (gameboard[0][0] === currentPlayerTurnName && gameboard[1][1] === currentPlayerTurnName && gameboard[2][2] === currentPlayerTurnName) ||
            (gameboard[2][0] === currentPlayerTurnName && gameboard[1][1] === currentPlayerTurnName && gameboard[0][2] === currentPlayerTurnName) 
    ) {
        gameOver = 1;
        return currentPlayerTurnName;
    } else {
        return null; 
    }

    }

    //plays turn and returns player name who won. if no one win's switch player
    function playTurn(r, c) {
        const gameboard = gameBoard.getGameboard();
        const playerNameIndex = players.findIndex((item) => item.name === currentPlayerTurn.name);
        if (gameboard[r][c] === 0) {
            gameboard[r][c] = players[playerNameIndex].name;
        } else {
            console.log("invalid turn");
            return;
        }
        const winner = checkIfWon();

        //if no one won in the last turn, keep playing by switching the player
        if (!winner) {
            switchPlayerTurn();
            return null;
        } else {
            return currentPlayerTurn.name;
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

    function getGameboard() {
        return gameboard;
    }

    return {clearBoard, getGameboard};
})();


//interacting with the DOM
const displayController = (function displayController() {

    const player1UI = document.getElementById("player1-input");
    const player2UI = document.getElementById("player2-input");
    const cellsUI = document.querySelectorAll(".grid-tile");
    const startButtonUI = document.getElementById("start-game-button");
    const resultsUI = document.getElementById("results");


    function bindEvents() {
        startButtonUI.addEventListener("click", createPlayersStartGame); 
        cellsUI.forEach((item) => item.addEventListener("click", playTurnUI));
    }

    function playTurnUI(event) {
        //these get the positions of the grid items
        const firstNumberString = String(event.target.id).charAt(0);
        const firstNumber = Number(firstNumberString);
        const secondNumberString = String(event.target.id).charAt(1);
        const secondNumber = Number(secondNumberString);

        //calls the function that plays the turn and updates the UI
        const winner = gameController.playTurn(firstNumber,secondNumber);
        console.log(winner);
        renderBoard();
        if (winner) {
            resultsUI.innerText = `${winner} won!`;
        } else {
            return;
        }
    }

    function createPlayersStartGame(event) {
        gameController.addPlayer(player1UI.value);
        gameController.addPlayer(player2UI.value);
        gameController.startGame();
    }

    function renderBoard() {
        const gameboard = gameBoard.getGameboard();
        for (let i=0; i<3; i++) {
            for (let j=0; j<3; j++) {
                const cellIndex = [...cellsUI].findIndex((item) => item.id === `${i}${j}`);
                if (gameboard[i][j] !== 0) {
                    cellsUI[cellIndex].innerText = gameboard[i][j];
                }
                
            }
        }
    }

    return {bindEvents}
})();

displayController.bindEvents();

//next, check to see if there are more dependencies calling UI logic from game logic. 
//then, update so user can't keep playing when gameOver