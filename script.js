//IEFE for controlling the game. All functions for game interactions here
const gameController = (function gameController() {

    const players = [];
    let currentPlayerTurn;
    //values for gameState are idle, playing, won, draw
    let gameState;

    //getter functions
    function getCurrentPlayerTurn() {
        return currentPlayerTurn;
    }

    function getGameState() {
        return gameState;
    }

    //call this after the two players have been created to set the player turn
    function addPlayer(name) {
        players.push({name});
    }
    
    function startGame() {
        currentPlayerTurn = players[0];
        gameState = "playing";
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
    ){ 
        gameState = "won";
    //check for draw by checking if there are any 0s in the thing 
        } else if (gameboard[0].includes(0) === false && gameboard[1].includes(0) === false && gameboard[2].includes(0) === false) {
            gameState = "draw";
    }

    }

    //plays turn and returns player name who won. if no one wins switch player
    function playTurn(r, c) {
        const gameboard = gameBoard.getGameboard();
        const playerNameIndex = players.findIndex((item) => item.name === currentPlayerTurn.name);
        
        //check if this is a valid turn; if it is update gameboard
        if (gameboard[r][c] === 0) {
            gameboard[r][c] = players[playerNameIndex].name;
            
            checkIfWon();
            
            //if no one won in the last turn, keep playing by switching the player
            if (gameState === "playing") {
                switchPlayerTurn();
            } 
            return {status: "valid"}
        } else {
            return {status: "invalid"};
        }

    }   

    return {startGame, addPlayer, playTurn, switchPlayerTurn, getCurrentPlayerTurn, getGameState};

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
        if (gameController.getGameState() === "playing") {
            const firstNumberString = String(event.target.id).charAt(0);
            const firstNumber = Number(firstNumberString);
            const secondNumberString = String(event.target.id).charAt(1);
            const secondNumber = Number(secondNumberString);
    
            //calls the function that plays the turn and updates the UI
            const turnResult = gameController.playTurn(firstNumber,secondNumber);
            renderBoard();
            if (turnResult.status === "invalid") {
                alert("Invalid Turn. Try again.");
            }
            if (gameController.getGameState() === "playing") {
                resultsUI.innerText = `It's ${gameController.getCurrentPlayerTurn().name}'s turn!`
            } else if (gameController.getGameState() === "won") {
                resultsUI.innerText = `${gameController.getCurrentPlayerTurn().name} won!`
            } else if (gameController.getGameState() === "draw") {
                resultsUI.innerText = "It's a tie"
            }
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


//first I'm going to build it so it works include edge cases
//then do the good things like make sure gameController checks state and all that

//in playTurn, are we still checking if won if turn status was invalid?