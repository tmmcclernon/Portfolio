/////////////////////////////////////////////////////////////////////////////////
//Author: Nnamdi Nwanze
//Purpose: Controls the View of an MVC blackjack game
/////////////////////////////////////////////////////////////////////////////////
//view.js
//addMessage(msg) – adds a given text (msg) to the message div.
function addMessage(msg) { //takes a message as a parameter and will add said message to the message div
    var messageDiv = document.getElementById("messagediv");
    if (messageDiv !== null)
    messageDiv.innerHTML = ""
    title=document.createElement("header")
    textForTitle = document.createTextNode("Message Board")
    title.appendChild(textForTitle)
    messageDiv.appendChild(title)
    msgForDiv = document.createTextNode(msg)
    messageDiv.appendChild(msgForDiv)
    messageDiv.scrollTop = messageDiv.scrollHeight;
}
function displayCard(cardSuit,cardRank ){//Displays card to the user
var newID = (cardSuit+cardRank);
var displayedCard = document.createElement("div");
addClass(displayedCard,"card_deck")
displayedCard.id = newID;
document.getElementById("player").appendChild(displayedCard)
}
function clearDisplayCardsPlayer(){ //Clears the cards on display for the user
    document.getElementById("player").innerHTML=""
    title=document.createElement("header")
    textForTitle = document.createTextNode((gamePlay.getUsername())+"'s Hand") //fix
    title.appendChild(textForTitle)
    document.getElementById("player").appendChild(title)
}
function clearDisplayCardsDealer(){//clears cards on display for the dealer
    document.getElementById("dealer").innerHTML=""
    title=document.createElement("header")
    textForTitle = document.createTextNode("Dealer's Hand")
    title.appendChild(textForTitle)
    document.getElementById("dealer").appendChild(title)
}
//clearMessages – Restores message div to its "clear state", all messages removed from the message div.
function clearMessages() { 
    document.getElementById("messagediv").innerHTML=""
    title=document.createElement("header")
    textForTitle = document.createTextNode("Message Board")
    title.appendChild(textForTitle)
    document.getElementById("messagediv").appendChild(title)
}
//show a div given the div's ID
function showDiv(divID) {
    var userDiv = document.getElementById(divID);
    if (userDiv !== null)
        userDiv.style.display = "block";
}
//hide a div given the div's ID
function hideDiv(divID) {
    var userDiv = document.getElementById(divID);
        userDiv.style.display = "none";
}


//check if a class has a given class
function hasClass(element, className) { return element.classList.contains(className);}

//adds a given class to an element if it does not have the class. Does nothing otherwise.
function addClass(element, className) {
    if (element.classList)	//if element has a class list
        element.classList.add(className);	//add class
    else if (!hasClass(element, className))	//else check if it doesn't have the class
        element.className += " " + className;
}
//removeClass(element, className) – removes a given class from an element if the class has it. Does nothing otherwise.
function removeClass(element, className) {
    if (element.classList)
        element.classList.remove(className);
}

function setUserName(userName){
    var playerDiv = document.getElementById("player");
    playerDiv.innerHTML=""//clear the defualt display name 
    title = document.createElement("header");
    textForTitle = document.createTextNode(userName+"'s Hand");
    title.appendChild(textForTitle);
    playerDiv.appendChild(title)//display username on div 
}
function updateBetDisplay(bet){
    div = document.getElementById("walletDiv")
    div.innerHTML = "" //clears the div so that messsages don't stack on eachother
    walletTitleTxt = document.createTextNode("Your Wallet: ")
    title = document.createElement("header");
    title.appendChild(walletTitleTxt);
    walletTxt = document.createTextNode("You have $"+ user.userWallet.getValue())
    betTxt = document.createTextNode("Your bet is: "+"$"+bet)
    betHeader = document.createElement("header")
    walletHeader = document.createElement("header")
    betHeader.appendChild(betTxt);
    walletHeader.appendChild(walletTxt)
    div.appendChild(title)
    div.appendChild(walletHeader);
    div.appendChild(betHeader);

}
function showDealtCard(player, cardSuit, cardRank, facedown){
    //player parameter specifices which div to use
    if(player == "player" ){
        var displayedCard = document.createElement("div");
        addClass(displayedCard,"card_deck")
        div = document.getElementById("player")
        if(facedown == true){
        displayedCard.id ="facedown"
        div.appendChild(displayedCard)
        }
        else{
            displayedCard.id = (cardSuit + cardRank)
            div.appendChild(displayedCard)
        }
    }
    else if(player == "dealer"){
        div = document.getElementById("dealer")
        var displayedCard = document.createElement("div");
        addClass(displayedCard,"card_deck")

        if(facedown ==true){
            displayedCard.id = "facedown"
            div.appendChild(displayedCard)
        }
        else{
            displayedCard.id = (cardSuit + cardRank)
            div.appendChild(displayedCard)
            

        }
    }
}
function revealFaceDownDealer(){
    facedown = blackjack.getFaceDownCard()
    suit = facedown.getSuit();
    rank = facedown.getRank()
    div = document.getElementById("dealer")
    div.removeChild(document.getElementById("facedown"))
    dealerCard = document.createElement("div")
    addClass(dealerCard, "card_deck")
    dealerCard.id=(suit + rank)
    div.appendChild(dealerCard)
}
function resetView(){//resets entire gameboard
clearDisplayCardsPlayer()
user.setUserBet(0) //reset users bet to zero for the next round
clearMessages()
clearDisplayCardsDealer()
setUserName(gamePlay.getUsername())
updateBetDisplay(0)//user's bet starts at 0 since we are begining a new game
}
function clearCardsFromPastRound(){
    clearDisplayCardsDealer()
    clearDisplayCardsPlayer()

}
function setUpNextRound(){
    user.setUserBet(0) //reset users bet to zero for the next round 
    updateBetDisplay(0)//user's bet starts at 0 since we are begining a new game 
}
function disableIncrementBet(){
    document.getElementById("increment").setAttribute("disabled","disabled")
}
function disableDecrementBet(){
    document.getElementById("decrement").setAttribute("disabled","disabled")
}
function disableDeal(){
    document.getElementById("deal").setAttribute("disabled", "disabled")
}
function disableHit(){
    document.getElementById("hit").setAttribute("disabled", "disabled")
}
function disableStay(){
    document.getElementById("stay").setAttribute("disabled", "disabled")
}
function disableSetBet(){
    document.getElementById("set").setAttribute("disabled","disabled")
}

function activateIncrementBet(){
    document.getElementById("increment").removeAttribute("disabled")}
function activateDecrementBet(){
    document.getElementById("decrement").removeAttribute("disabled")}
function activateDeal(){
    document.getElementById("deal").removeAttribute("disabled")}
function activateHit(){
    document.getElementById("hit").removeAttribute("disabled")}
function activateStay(){
    document.getElementById("stay").removeAttribute("disabled")}
function activateSetBet(){
    document.getElementById("set").removeAttribute("disabled")
}
function activateBeginningBtns(){
    activateIncrementBet()
    activateDecrementBet()
    activateSetBet()
    disableDeal()
    disableHit()
    disableStay()
}
//INTIALIZE VIEW
updateBetDisplay(0); //intialize wallet display
activateBeginningBtns() //allows only the bet buttons and reset to be clicked since the user has not yet started the game

