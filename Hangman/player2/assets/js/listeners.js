/////////////////////////////////////////////////////////////////////////////////
//Author: Nnamdi Nwanze  & Tommy McCleron
//Purpose: Controls the listeners of an MVC hangman game
/////////////////////////////////////////////////////////////////////////////////
//listeners.js
//addEventListeners to game play control buttons
document.querySelector("#controls").addEventListener('click', e => {
    const clickedButton = e.target;
    //disable button after clicking
    clickedButton.disabled = true;
    gamePlay.Hangman.UserGuess(clickedButton.id);
});

//addEventListeners to the play game button
document.querySelector("#playagain").addEventListener('click', e => {
    //Reset Game
    
    gamePlay.reset();
});
//addEventListener to the exit game button
document.querySelector("#exitgame").addEventListener('click', e => {
    //Reset Game
    gamePlay.reset();
    exitGame();
});

