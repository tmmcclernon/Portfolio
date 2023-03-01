/////////////////////////////////////////////////////////////////////////////////
//Author: Nnamdi Nwanze
//Purpose: Create a blackjack game using objects and an MVC design
/////////////////////////////////////////////////////////////////////////////////
//app.js
var gamePlay = {
    Blackjack: Object.create(blackjack),

//gets then returns the username
    getUsername: function () {
        //get user name
        let myURL = String(window.location)
        //parse URL to find username
        urlArray = myURL.split("username=");
        userName = urlArray[1];
        userName= userName.replaceAll("+"," ")//url reprsents spaces with a + symbol
        return(userName);
    },
//uses  Battleship member to setup and start a game
    playGame: function () {
        if(blackjack.isPlayerOutOfMoney == true){
            this.isGameOver
        }
        this.reset();
    },
// Adds a “Game over” message to the message div if the game is over.
    isGameOver: function () {
        addMessage("Game Over - Out of Money")
        
    },
// Resets the game board, resets the message div and starts a new game
    reset: function () {
        this.Blackjack.initialize();
    }
};
setUserName(gamePlay.getUsername())
gamePlay.playGame();

