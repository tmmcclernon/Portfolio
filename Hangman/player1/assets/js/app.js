/////////////////////////////////////////////////////////////////////////////////
//Author: Nnamdi Nwanze  & Tommy McCleron
//Purpose: Create a hangman game using objects and an MVC design
/////////////////////////////////////////////////////////////////////////////////
//app.js
var gamePlay = {
    Hangman: Object.create(hangman),

//gets then returns the username
    getUsername: function () {
        var currentURL = window.location + "";
        var splitURL = currentURL.split("=");
        var username = splitURL[1];
        return username;
    },
//uses  Battleship member to setup and start a game
    playGame: function () {
        this.reset();
    },
// If all ships are marked, it adds a “Game over” message to the message div.
    isGameOver: function () {
    },
// Resets the game board, resets the message div and starts a new game
    reset: function () {
        addContrlButtons();
        this.Hangman.setup();
        hideBackDrop();
    }
};

gamePlay.playGame();
showUserName();
