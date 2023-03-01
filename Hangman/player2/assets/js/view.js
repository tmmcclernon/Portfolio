/////////////////////////////////////////////////////////////////////////////////
//Author: Nnamdi Nwanze
//Purpose: Controls the View of an MVC hangman game
/////////////////////////////////////////////////////////////////////////////////
//view.js



//show user name on the board
function showUserName() {
    let toppart = document.getElementById('toppart');
    const un = gamePlay.getUsername();
    if (un !==undefined){
        toppart.innerHTML = "Hello "+ un+ "! "+ toppart.innerHTML;
    }
  $.post("http://127.0.0.1:3000/username",{username: un},function(data){
      console.log(data)
  });
    
   
}
//show the updated guessed word
function showGuessedWord() {
    let wordDiv = document.getElementById('word');
    let guessString = "";
    for (let i = 0; i < gamePlay.Hangman.currentWord.length; i++)
        guessString += gamePlay.Hangman.guessedWord[i] + " ";
    wordDiv.innerHTML = guessString;
}
//show the number of players connected to the server
function showNumberOfPlayers(num) {
    let numPlayers = document.getElementById('numPlayers');
    numPlayers.innerHTML = "There are "+num;
}
//show how many chances the user has left to guess the word
function showChancesLeft() {
    let chancesleft = document.getElementById('chancesleft');
    chancesleft.innerHTML = gamePlay.Hangman.player.getGuessesLeft();
    let hmsg = document.getElementById('hangman');
    hmsg.innerHTML = "";
    for (let i = 0; i < gamePlay.Hangman.maxGuesses - gamePlay.Hangman.player.getGuessesLeft(); i++) {
        hmsg.innerHTML += hangmessage[i] + "<br>";
    }
}
//reset the chances left on the board
function resetChancesLeft() {
    let chancesleft = document.getElementById('chancesleft');
    chancesleft.innerHTML = gamePlay.Hangman.maxGuesses;
    let hmsg = document.getElementById('hangman');
    hmsg.innerHTML = "Doing great so far!";
}
//show the player's score
function showuserScore() {
    let us = document.getElementById('userScore');
    us.innerHTML = gamePlay.Hangman.player.getScore();
}
//show the player's score updated from the server
function showPlayerScore(data) {
    let ps = document.getElementById('PlayersScores');
    ps.innerHTML = data.username + " just scored " + data.score + " points";
}
//hide the end of the round backdrop
function hideBackDrop() {
    let bd = document.getElementById('backdrop');
    bd.style.display = "none";
}
//show the end of the round backdrop with a message
function showBackDrop(msg) {
    let gameOutcome = document.getElementById('gameOutcome');
    let bd = document.getElementById('backdrop');
    gameOutcome.innerHTML = msg;
    bd.style.display = "block";
}
//exit the game after a round
function exitGame() {
    let content = document.getElementById('content');
    content.innerHTML = "Heading to DuckDuckGo in 2 seconds";
    setTimeout(function () {
        location.href = "https://duckduckgo.com/";
    }, 2000);
}
//exit the game after all words are exhausted
function exitAll() {
    hideBackDrop();
    let content = document.getElementById('content');
    content.innerHTML = "No more words to play. Maybe you can find a new game? Heading to DuckDuckGo in 3 seconds";
    setTimeout(function () {
        location.href = "https://duckduckgo.com/";
    }, 3000);
}
//add control buttons to play the game
function addContrlButtons() {
    let controls = document.getElementById('controls');
    controls.innerHTML = "";
    let startcode = 65;
    let myBtnGrp;
    for (let i = 0; i < 26; i++) {
        if (i % 6 == 0) {
            myBtnGrp = document.createElement("div");
            myBtnGrp.classList.add("btn-groups");
            controls.innerHTML += "<br>";
        }
        let myButton = document.createElement("button");
        let character = String.fromCharCode(startcode + i);
        myButton.id = character;
        myButton.innerHTML = character;
        myButton.classList.add("btn", "btn-lg", "btn-primary", "col-2");
        myBtnGrp.appendChild(myButton);
        controls.appendChild(myBtnGrp);
    }  
}
