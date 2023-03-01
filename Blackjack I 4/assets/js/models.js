/////////////////////////////////////////////////////////////////////////////////
//Author: Nnamdi Nwanze
//Purpose: Sets up the Models of an MVC blackjack game
/////////////////////////////////////////////////////////////////////////////////
//models.js
const suits = ["H","S","C","D"];	//allowable suits
const maxCardsPerSuit = 13;		//max cards per suit
var card = {
    rank:0, //value 1-13
    suit: null, //can be diamonds, hearts, clubs, spades

    //sets rank of card
    setRank: function (value) { this.rank = value; },
    //gets rank of card
    getRank: function () { return this.rank; },
    //gets value of card
    getValue: function () {
        if (this.rank > 10)
            return 10;
        else
            return this.rank;

    },
    //sets suit of card
    setSuit: function(value){this.suit = value},
    //gets suit of card
    getSuit: function(){return this.suit}
};

var card_deck = {
    deck: [],
    discard:[],
    decksize: 52,
    cardsleft: null, 
    reshuffleMarker: 16, // helps the game to decide when to reshuffle the deck
    getReshuffleMark: function(){
        return this.reshuffleMarker
    },
    putDiscardsBackInDeck: function(){
        for(let i =0; i<=this.discard.length;i++){
            this.deck.unshift(this.discard.shift())
        }
        
    },
    //populates the deck with cards
    initialize: function(){
        while(this.deck.length < this.decksize){
            for(let i=0; i<suits.length;i++){//determines the suit of the card 
                for(let j=1;j<=maxCardsPerSuit;j++){
                    let newCard=Object.create(card);
                    newCard.setSuit(suits[i]);
                    newCard.setRank(j);
                    this.deck.push(newCard);
                }
            }
        }
        this.cardsleft = this.deck.length; //initialize cards left = to number of items in the deck (no cards drawn yet)

    },
    shuffle: function(){ //shuffles deck
        let currentIndex = this.deck.length,  randomIndex;
      
        
        while (currentIndex != 0) {
          randomIndex = Math.floor(Math.random() * currentIndex);
          currentIndex--;
      
          //swapping elements w/n the deck
          [this.deck[currentIndex], this.deck[randomIndex]] = [
            this.deck[randomIndex], this.deck[currentIndex]];
        }
        return this.deck;
      },
      getNumCardsLeft: function(){
          remainingCards = this.deck.length;
          return remainingCards;
      },
      returnDiscardsToDeck: function(){ //returns a deck of discarded cards
        for(let i = 0; i<this.discard.length;i++){
            this.deck.push(this.discard[i])
            addMessage("Deck Re-shuffled")
            card_deck.shuffle()
        }
        hand.clearDiscard(); //clears the user dicard "pile"
      },
      dealCard: function(){
        playersCard = this.deck.shift();//moves a card off the deck for the user
        this.cardsleft = this.deck.length;
        if(this.cardsleft < this.reshuffleMarker){//determines when to shuffle the deck again
            addMessage("Deck Re-shuffled"); 
            card_deck.shuffle(); //need to shuffle if less than reshuffle point
            if(hand.getDiscard()!= []){ //checks to see if there are discarded cards that need to return to the deck
                this.cardsleft = this.deck.length; // we added cards to the deck so now we re-defones cardsleft value
            }
            }
        
        return playersCard
      }
};   



var hand = {
    cards: [],
    discard: [],
    score:  0,  //hand is empty score = 0
    aceHighScore: 0,
    //sets score value of hand
    setScore: function (value) {
        this.score += value;
        this.aceHighScore += value;
        if ((value === 1) && (this.aceHighScore <= 11)) {
            this.aceHighScore += 10;
        }
        if (this.aceHighScore > 21) {
            this.aceHighScore = this.score;
        }
    },
    //gets score value of hand
    getScore: function () {
        return this.aceHighScore>this.score? this.aceHighScore:this.score;
    },
    //Adds a give card to the player's hand
    addCard: function (card) {
        if (this.cards === 0) {
            this.cards = [card];
        } else {
            this.cards.push(card);
        }
        this.setScore(card.getValue());
    },
    //reset hand
    reset: function () {
        this.cards = 0; //remove all cards
        this.score = 0; //set score to zero
        this.aceHighScore = 0; //set ace high score to zero
    },
    //boolean function to check player's hand to see if they have an ace
    hasAce: function () {
        if (this.cards === 0) { return false; }
        let numCards = 0;
        //returns true once the first ace is found
        while (numCards < this.cards.length) {
            if (this.cards[numCards].getRank()===1)
                return true;
            numCards += 1;
        }
        //returns false otherwise
        return false;
    },
    addToDiscard: function(discardedCard){
        this.discard.push(discardedCard);
    },
    getDiscard: function(){
        return this.discard;
    },
    clearDiscard: function(){
        this.discard = [];
    },
    //sets score value of hand
    setScore: function (value) {
        this.score += value;
        this.aceHighScore += value;
        if ((value === 1) && (this.aceHighScore <= 11)) {
            this.aceHighScore += 10;
        }
        if (this.aceHighScore > 21) {
            this.aceHighScore = this.score;
        }
    },
    getScore: function(){
        return this.aceHighScore>this.score? this.aceHighScore:this.score;
    },
    emptyHand: function(){//get rid of this?
        for(let i =0; i<this.cards.length;i++){ //traverse through cards and add them to discard
            this.addToDiscard(this.cards[i])
        }
        this.cards = []//clear the hand

      },
    resetScore: function(){
        this.score = 0;
        this.aceHighScore =0;
      }
    
};

var wallet = {
    value: 0,
    setValue: function(amount){
    this.value = amount;
    },
    getValue(){
        return this.value;
    },
    addValue(amount){
        this.value += amount;
    },
    decrementValue(amount){
        this.value-= amount;
    }
};

var user = {
    userhand: Object.create(hand),
    userBet: 0,
    userWallet: Object.create(wallet),
    setUserBet: function(amount){
        this.userBet = amount;
    },
    initialize: function(){
        this.userWallet.setValue(1000)//set 1000 to wallet
    },
    incUserBet: function(){
        if(this.userBet < this.userWallet.getValue()){
            this.userBet+=100;
        }
        
    },
    decUserBet: function(){
        if(this.userBet!= 0){
            this.userBet-=100;
        }
        
    }

};

var blackjack = {
    faceDownCard: null,
    advice: null,
    carddeck: Object.create(card_deck),
    dealer: Object.create(hand),
    player: Object.create(user),
    dealersHitLimit:16,
    initialize: function(){
        card_deck.initialize(); //generate the card deck for starting the game
        card_deck.shuffle(); //this is the first shuffle of the game, deck is shuffled so the game can start
        user.initialize();//readies the user's chips
        hand.resetScore() // starts score at 0
        this.dealer.resetScore() //starts dealer score at 0
    },

    getFaceDownCard: function(){
        return this.faceDownCard;
    },
    addressHitLimit: function(){
        if(this.dealer.score < this.dealersHitLimit){
            while(this.dealer.score<this.dealersHitLimit){//
            dealerCard = card_deck.dealCard()
            this.dealer.addCard(dealerCard)
            showDealtCard("dealer",dealerCard.getSuit(),dealerCard.getRank(),false) // display new card
            }
        }
    },
    discardCardsInPlay(){ //Call this after a winner is decided
        
        for(let j=0; j<user.userhand.cards.length;j++){
            card_deck.discard.push(user.userhand.cards[j]); //user is discarding cards in play
        }
        user.userhand.reset()
        for(let i = 0; i<this.dealer.cards.length;i++){
            card_deck.discard.push(this.dealer.cards[i]);
        }
        this.dealer.reset()
    },
    deal: function(){
        dealerCardFaceDownStatus = true
        this.dealer.reset();
        user.userhand.reset();
        if(user.userBet >=100){ //only deal once user has placed a satisfactory bet
            if(card_deck.deck.length < card_deck.getReshuffleMark()){
                card_deck.returnDiscardsToDeck();
            }
            //User first card
            userFirstCard = card_deck.dealCard();
            user.userhand.addCard(userFirstCard)
            showDealtCard("player", userFirstCard.getSuit(), userFirstCard.getRank(), false)
            //Dealer First card
            dealerFirstCard = card_deck.dealCard();
            this.dealer.addCard(dealerFirstCard);
            this.faceDownCard = dealerFirstCard;
            showDealtCard("dealer", dealerFirstCard.getSuit(), dealerFirstCard.getRank(),dealerCardFaceDownStatus)
            dealerCardFaceDownStatus = false; //only the first card the dealer gets will be facedown
            //user second card
            userSecondCard = card_deck.dealCard();
            user.userhand.addCard(userSecondCard)
            showDealtCard("player", userSecondCard.getSuit(), userSecondCard.getRank(),false)
            //dealer second card
            dealerSecondCard = card_deck.dealCard();
            this.dealer.addCard(dealerSecondCard)
            this.faceDownScoreDealer =  dealerSecondCard.getValue()
            showDealtCard("dealer",dealerSecondCard.getSuit(),dealerSecondCard.getRank(),dealerCardFaceDownStatus)
            activeGame = true; //Blackjack game has started
            
    }
 
    else{
        addMessage("Please place a bet of $100 or more")
    }
    addMessage("Your Score is: "+user.userhand.getScore())
       
    },
    
    sendScores: function(){
        userscore= user.userhand.getScore();
        dealerscore= this.faceDownScoreDealer
        if(dealerscore ==1){//an ace will always be worth 11 when other card is still face down
            dealerscore = 11
        }
        $.getJSON("http://127.0.0.1:3000/", {userscore, dealerscore},function(data){
            
            blackjack.advice = data.content.advice;
            addMessage("Your Score is "+userscore+" You should " + blackjack.advice);
            setTimeout(function(){ blackjack.getRemoteMove(); }, 1000);
            
        })
        .fail(function() { addMessage("there was an error please click the button again"); })
    
        
    },
    xhr: function(){
        userscore= user.userhand.getScore();
        dealerscore = this.faceDownScoreDealer
        if(dealerscore ==1 ){ // an ace will always be worth 11 if the second card is still faced down
            dealerscore =11
        }
        scores = new URLSearchParams();
        scores.append('userscore', userscore)
        scores.append('dealerscore', dealerscore)
        let xhr = new XMLHttpRequest();
	    xhr.open('GET', 'http://127.0.0.1:3000/?'+scores);
	    xhr.responseType = 'json'
        xhr.send();
	    xhr.onreadystatechange = function () {
		if (xhr.status != 200) {
			addMessage("There was an error please click the button again")
		} 
        else {
			if (xhr.readyState==4 && xhr.status==200) {
			msg = xhr.response;
          
            
            addMessage("Your Score is "+userscore+" You should " + blackjack.advice);
        
			}
        }
    }
        
    },
    generateFetchHint: function(){
        userscore = user.userhand.getScore()
        dealerscore = this.faceDownScoreDealer;
        if(dealerscore ==1 ){ // an ace will always be worth 11 if the second card is still faced down
            dealerscore =11
        }
        console.log(dealerscore)
        scores = new URLSearchParams();
        scores.append('userscore', userscore)
        scores.append('dealerscore', dealerscore)
        fetch('http://ncnwanze.faculty.noctrl.edu/blackjackadvice.php?'+scores,{
            method: 'get',
            mode: 'cors',//using cors to allow different origin calls
		    referrerPolicy: 'origin',
		    cache: 'default'
        })
          .then(response => {
            if(response.ok){
                return response.json()
            }
            else{
                throw new Error('Something went wrong on the server')
            }
          })
          
          .then(data => {
              console.log(data)
              
              
                blackjack.advice = data.content.Advice
                addMessage("Your Score is "+userscore+" You should " + blackjack.advice)
                setTimeout(function(){blackjack.getRemoteMove()},1000);
          }).catch(err => {
            addMessage("There was an error please click the button again")
          });
          
          
    },
getRemoteMove: function(){
        console.log("advice:"+ blackjack.advice)
        if(blackjack.advice == "Hit"){
            document.getElementById("hit").click()
        }
        if(blackjack.advice == "Stay"){
            document.getElementById("stay").click()
        }
        
    },
    hit: function(){//draws an extra card
        if(user.userhand.getScore() < 21){
            userCard = card_deck.dealCard();
            user.userhand.addCard(userCard);
            showDealtCard("player", userCard.getSuit(), userCard.getRank(), false);
            addMessage("Your Score is: "+user.userhand.getScore())
            if(card_deck.deck.length < card_deck.getReshuffleMark()){
                card_deck.returnDiscardsToDeck();
            }
            if(user.userhand.getScore() > 21){
                disableHit() // user can no longer draw cards once their score passes 21
            }
        }
    },
    setBetAmount: function(amount){
        user.userBet = amount;
    },
    getBetAmount: function(){
        return user.userBet;
    },
    didPlayerBust: function(){
        if(user.userhand.getScore()> 21){
            return true;
        }
        else{
            return false;
        }
    },
    didPlayerGet21: function(){
        if(user.userhand.getScore() == 21){
            return true;
        }
        else{
            return false;
            }
        },
    didDealerGet21:function(){
        if(this.dealer.getScore() == 21){
            return true;
        }
        else{
            return false;
            }
    },
    
    //returns true if player is out of money meaning the user can no longer play
    isPlayerOutOfMoney: function(){
    if(user.userWallet.getValue() == 0){
        gamePlay.isGameOver();
        return true;
        
    }
    else{
        return false;
    } 
    },
    determineWinner: function(){
        if(this.dealer.getScore() == user.userhand.getScore()){
            addMessage("It's a Tie! :/")
            //user did not lose so return the bet money
            user.userWallet.addValue(0)//nothing happens to the user
            this.discardCardsInPlay()
            return true;
        }
         if(this.didPlayerGet21() == true){
            addMessage("You Won! :)")
            //user won so user gets bet money from the dealer
            user.userWallet.addValue(blackjack.getBetAmount())
            this.discardCardsInPlay()
            return true;
        }
        if(user.userhand.getScore() < 21 &&this.dealer.getScore() < 21){
            if(this.dealer.getScore() > user.userhand.getScore()){
                //user lost
                addMessage("You Lost :(")
                //user loses their bet
                user.userWallet.decrementValue(blackjack.getBetAmount())
                this.discardCardsInPlay()
                return true;

            }
            else{
                //user won
                addMessage("You Won! :)")
                //user won so user gets bet money from the dealer
                user.userWallet.addValue(blackjack.getBetAmount())
                this.discardCardsInPlay()
                return true;
                
            }
        }
        if(this.dealer.getScore() == 21 && user.userhand.getScore() != 21){
            addMessage("You Lost! :(")
            //loses bet
            user.userWallet.decrementValue(blackjack.getBetAmount())
            this.discardCardsInPlay()
            return true;
        }

        if(this.didPlayerBust() == true){
            //user lost
            addMessage("You Lost :(")
            //user loses their bet
            user.userWallet.decrementValue(blackjack.getBetAmount())
            this.discardCardsInPlay()
            return true;
        }
        if(this.dealer.score > 21){
            //dealer busts player wins
            addMessage("You Win!")
            //user gains bet
            user.userWallet.addValue(blackjack.getBetAmount())
            this.discardCardsInPlay()
            return true;
        }
       
    },

    
};
blackjack.initialize()//test