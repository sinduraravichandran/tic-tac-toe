//IEFE for controlling the game. All functions for game interactions here
const gameController = (function gameController() {

    const players = [];
    let currentPlayerTurn;
    let gameOver = false;

    //call this after the two players have been created to set the player turn
    function addPlayer(name) {
        players.push({name});

    }
    
    function startGame() {
        currentPlayerTurn = players[0];
        gameOver = false;
        return gameOver;
    }

    // function restartGame() {
    //     players.length = 0;
    //     gameOver = false;
    //     gameBoard.clearBoard();
    // }

    function getCurrentPlayerTurn() {
        return currentPlayerTurn;
    }

    function switchPlayerTurn() {
        if (currentPlayerTurn === players[0]) {
            currentPlayerTurn = players[1];
        } else {
            currentPlayerTurn = players[0];
        }
    }

    function checkIfWon() {
        const gameboard = gameBoard.getGameboard();
        //if there are three in a row of currentPlayerTurn, then the currentPlayer won
        if ((gameboard[0][0] === currentPlayerTurn.name && gameboard[0][1] === currentPlayerTurn.name && gameboard[0][2] === currentPlayerTurn.name) ||
            (gameboard[1][0] === currentPlayerTurn.name && gameboard[1][1] === currentPlayerTurn.name && gameboard[1][2] === currentPlayerTurn.name) ||
            (gameboard[2][0] === currentPlayerTurn.name && gameboard[2][1] === currentPlayerTurn.name && gameboard[2][2] === currentPlayerTurn.name) ||
            (gameboard[0][0] === currentPlayerTurn.name && gameboard[1][0] === currentPlayerTurn.name && gameboard[2][0] === currentPlayerTurn.name) ||
            (gameboard[0][1] === currentPlayerTurn.name && gameboard[1][1] === currentPlayerTurn.name && gameboard[2][1] === currentPlayerTurn.name) ||
            (gameboard[0][2] === currentPlayerTurn.name && gameboard[1][2] === currentPlayerTurn.name && gameboard[2][2] === currentPlayerTurn.name) ||
            (gameboard[0][0] === currentPlayerTurn.name && gameboard[1][1] === currentPlayerTurn.name && gameboard[2][2] === currentPlayerTurn.name) ||
            (gameboard[2][0] === currentPlayerTurn.name && gameboard[1][1] === currentPlayerTurn.name && gameboard[0][2] === currentPlayerTurn.name) 
    ) {
        gameOver = true;
        return currentPlayerTurn;
    } else {
        return null; 
    }

    }

    //plays turn and returns player name who won. if no one win's switch player
    function playTurn(r, c) {
        if (!gameOver) {
            const gameboard = gameBoard.getGameboard();
            const playerNameIndex = players.findIndex((item) => item.name === currentPlayerTurn.name);
            if (gameboard[r][c] === 0) {
                gameboard[r][c] = players[playerNameIndex].name;
            } else {
                console.log("invalid turn");
                return {
                    status: "invalid",
                    currentPlayerTurn,
                    winner: null
                };
            }
            const winner = checkIfWon();
            //if no one won in the last turn, keep playing by switching the player
            //if someone won, return the winner
            if (!winner) {
                switchPlayerTurn();
                return {
                    status: "playing",
                    currentPlayerTurn,
                    winner: null
                };
            } else {
                return {
                    status: "won",
                    winner
                };
            }
        } else {
            return {
                status: "gameOver"
            }
        }
    }   

    return {startGame, addPlayer, getCurrentPlayerTurn, playTurn, switchPlayerTurn};

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

//-----------------------------------------------------------------------------------
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
        const turnResult = gameController.playTurn(firstNumber,secondNumber);
        renderBoard();
        if (turnResult.status === "invalid") {
            resultsUI.innerText = "Invalid Turn. Try again."
        } else if (turnResult.status === "playing") {
            resultsUI.innerText = `It's ${turnResult.currentPlayerTurn.name}'s turn`
        } else if (turnResult.status === 'won') {
            resultsUI.innerText = `${turnResult.winner.name} won!`
        } else if (turnResult.status === "gameOver") {

            //do nothing

        }
        
    }

    function createPlayersStartGame(event) {
        gameController.addPlayer(player1UI.value);
        gameController.addPlayer(player2UI.value);
        player1UI.value = '';
        player2UI.value = '';
        gameController.startGame();
    
    }

    function renderBoard() {
        const gameboard = gameBoard.getGameboard();
        for (let i=0; i<3; i++) {
            for (let j=0; j<3; j++) {
                const cellIndex = [...cellsUI].findIndex((item) => item.id === `${i}${j}`);
                //if the item in the array isn't 0, then update the text with the name
                if (gameboard[i][j] !== 0) {
                    cellsUI[cellIndex].innerText = gameboard[i][j];
                }
                
            }
        }
        if () {

        }
    }

    return {bindEvents}
})();

displayController.bindEvents();



//edge cases to add
//Start Game turns to restart game when the game is won. 
// I'm going to do it by creating a game state that controls if game is in play
//or not and when it's in play then you can't edit player names and it says restart
//when it's not in play you can't edit the other things on the board 
//user can't play until they've clicked start game
//user can't click start game without adding player names 
//handling a draw