/////////////////////////////////////////////////////////////////////////////////
//Author: Nnamdi Nwanze & Tommy McCleron
//Purpose: Sets up the Models of an MVC hangman game
/////////////////////////////////////////////////////////////////////////////////
//models.js
//maximum number of guesses
var maxGuesses = 10;
//hangman message
const hangmessage = ["You","are","now","out","of","chances","to","guess","the","word."]

var user = {
    score: 0,
    numWins:0, //track the number of wins
    numLosses:0, //track the number of losses
    numGuessesLeft: maxGuesses,
    //set score
    setScore: function (value) {
        this.score = value;
    },
    //get score
    getScore: function () {
        return this.score;
    },
    //set number of guesses left
    setGuessesLeft: function (value) {
        this.numGuessesLeft = value;
    },
    //get number of guesses left
    getGuessesLeft: function () {
        return this.numGuessesLeft;
    },
    //decrement number of guesses left
    decGuessesLeft: function () {
        this.numGuessesLeft--;
    },
    //setup user
    initialize: function (MaxChances) {
        //this.shuffle();
        this.setGuessesLeft(MaxChances);
        //this.setScore(0);
    },
    //add points to user score
    addToScore: function (points) {
        this.score += points;
    }
};

var hangman = {
    maxGuesses: maxGuesses,
    wordBank: ["heaven","Efficiency", "readability","nodejs","stay"],
    usedWords: [],
    currentWord: "",
    guessedWord: [],
    gameStatus: "ongoing",
    player: Object.create(user),
    shuffle: function () {
        for (let i = 0; i < this.wordBank.length; i++) {
            let randomIndex = Math.floor(Math.random() * this.wordBank.length);
            var tempCard = this.wordBank[i];
            this.wordBank[i] = this.wordBank[randomIndex];
            this.wordBank[randomIndex] = tempCard;
        }
    },
    //pick a word to guess
    selectWord: function () {
        //exit the game if there are no more words to pick from
        if (this.wordBank.length === 0)
            exitAll();
        //remove the used words from the word bank
        let selection = this.wordBank.pop();
        this.usedWords.push(selection);
        return selection;
    },
    //set up the guessed word
    setUpGuessedWord: function () {
        this.guessedWord = [];
        for (let i = 0; i < this.currentWord.length; i++)
            this.guessedWord.push('_');
    },
    //setup the game
    setup: function () {
        //set up player
        this.player.initialize(this.maxGuesses);
        //setup game
        this.shuffle();
        this.currentWord = this.selectWord();
        this.setUpGuessedWord();
        showGuessedWord();
        resetChancesLeft();
    },
    //check if user has guess the word
    isWordGuessed: function () {
        let count = 0;
        while ((this.guessedWord[count] !== '_') && (count < this.guessedWord.length)) {
            count++;
        }
        if (count < this.guessedWord.length)
            return false;
        return true;
    },
    //update the word with each guess
    updateGuessedWord: function (guess) {
        for (let i = 0; i < this.currentWord.length; i++) {
            if (this.currentWord.toUpperCase().charAt(i) == guess) {
                this.guessedWord[i] = guess;
            }
        }
    },
    //check to see if the user guessed correctly
    doesWordContainGuess: function (guess) {
        return this.currentWord.toUpperCase().includes(guess);
    },
    //User guess
    UserGuess: function (guess) {
        //check to see if the user guessed a letter in the word
        if (this.doesWordContainGuess(guess)) {
            this.updateGuessedWord(guess);    //if so, update the word
            showGuessedWord();                //and display the update
            if (this.isWordGuessed()) {
                gameStatus = " Player 2 Won";
                this.roundIsOver();
                this.sendP1StatsToP2();
            }
        } else {
            //otherwise
            //if player still has guess, decrement
            if (this.player.getGuessesLeft() >= 1) {
                this.player.decGuessesLeft();
                //show the chances they have left
            } else {
                //game round is over
                showBackDrop("You did not win :(");
                gameStatus = " Player 2 Lost";
                this.player.numLosses++;
                this.sendP1StatsToP2()
            }
            showChancesLeft();
        }
    },
    //actions take when the round is over
    sendP1StatsToP2 : function(){
        playerName = gamePlay.getUsername()
        score = this.player.score
        wins = this.player.numWins
        losses = this.player.numLosses
        gameState = gameStatus
        $.getJSON("http://127.0.0.1:3000/player2",{playerName,score,gameState,wins,losses},function(data){
        
    });
    console.log(" p2 assests called P1->P2 request sent")
},
   

    roundIsOver : function () {
        showBackDrop("<strong>You won!</strong>");
        this.player.numWins++;
        this.player.addToScore(this.player.getGuessesLeft());
        
        showuserScore();
        updateSocketOnRoundOver();
        
        
    }
    
};

   
