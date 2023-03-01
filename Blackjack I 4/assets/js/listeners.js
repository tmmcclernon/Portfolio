/////////////////////////////////////////////////////////////////////////////////
//Author: Nnamdi Nwanze
//Purpose: Controls the listeners of an MVC blackjack game
/////////////////////////////////////////////////////////////////////////////////
//listeners.js

document.getElementById("hit").addEventListener("click", function() {
    //Deal card to user
    blackjack.hit()
});

document.getElementById("reset").addEventListener("click",function(){
    resetView() // resets gameboard
    blackjack.initialize()
    user.initialize()
    activateBeginningBtns()
    
    
});
document.getElementById("set").addEventListener("click", function(){
    //user has submitted thier bet and can now access the deal button 
    activateDeal()
    //user no longer needs access to bet related buttons
    if(blackjack.getBetAmount() < 100){
        addMessage("Please Enter a bet of $100 or more")
    }
    else{//Bet is valid so we can disable the betting buttons
        disableSetBet()
        disableIncrementBet()
        disableDecrementBet()
    }

});
document.getElementById("increment").addEventListener("click",function(){
    clearCardsFromPastRound() //helps accuratley display cards
    moneyLeft = user.userWallet.getValue()
    if(moneyLeft != 0){
        user.incUserBet()
    }
    updateBetDisplay(user.userBet)
});

document.getElementById("decrement").addEventListener("click",function(){
currentBet = user.userBet
if(currentBet !=0){
    user.decUserBet()
}
updateBetDisplay(user.userBet)
});

document.getElementById("deal").addEventListener("click", function(){
    blackjack.deal();
    activateStay() // activate user's options
    activateHit()
    disableDeal()//need to disable deal as it will not be used again until a new game is started
    //bet buttons are still disabled too
});
$("#jquery").click(function(){
    blackjack.generateJqueryHint()
    
  });
$("#xhr").click(function(){
   blackjack.generateXMLHint()
});
$("#remoteMove").click(function(){
    blackjack.sendScores();
});
document.getElementById("stay").addEventListener("click",function(){
    //disable other buttons and end user's turn
   disableHit()
   disableStay()
   //show facedown card
   revealFaceDownDealer()
   blackjack.addressHitLimit()
   //Determine winner and then reactivate begining buttons incase the user wants to continue
   blackjack.determineWinner()
   updateBetDisplay(0)//reset the user's bet to zero
   if(blackjack.isPlayerOutOfMoney() ==false){
       activateBeginningBtns()
       setUpNextRound()
   }
  
});

   

