#-----------------------------------------------------------------------------------------------
#Authors    : Jason England & Tommy McClernon
#Date Due   : September 29th, 2022
#Description: This program simulates a game of virtual 3 card poker.
#   The user enters a bet, the compute matches, 2/3 of the cards are revealed,
#   the user can keep their bet or raise, then the final two cards
#   are revealed and the winner of the hand is declared.
#   The AI is able to cheat against the user depending on how much the user bets.
#   The Higher the user bets, the higher the odds the AI will cheat.
#   The "PyDealer" library is used heavly throughout this program to create and edit the decks.
#   PyDealer - https://pydealer.readthedocs.io/en/latest/
#-----------------------------------------------------------------------------------------------

#Imports
import pydealer
import random
import math


#Functions:

#DeclareWinner will pass in two hands and print the winner of that hand with the correct reason.
def declareWinner(userHand, aiHand):
    #Sorting hands for comparison
    userHand.sort()
    aiHand.sort()
    #Checks the types of hands the player and computer has, then prints who won
    if(checkStraightFlush(userHand) and checkStraightFlush(aiHand) == False):
        print("You are the Winner with a Straight Flush!")
        print("You have won $" + str((userBet * 2)))
    elif(checkStraightFlush(aiHand) and checkStraightFlush(userHand,) == False):
        print("You Lost to a Straight Flush!")
        print("You have lost your $" + str(userBet))
    elif(checkStraightFlush(aiHand) and checkStraightFlush(userHand)):
        print("You both had Straight Flushes so...")
        checkHighCards(userHand,aiHand)
    else:
        if(checkTriple(userHand) and checkTriple(aiHand) == False):
            print("You are the Winner with a Triple!")
            print("You have won $" + str((userBet * 2)))
        elif(checkTriple(aiHand) and checkTriple(userHand) == False):
            print("You Lost to a Triple!")
            print("You have lost your $" + str(userBet))
        elif(checkTriple(aiHand) and checkTriple(userHand)):
            print("You both had Triples so...")
            checkHighCards(userHand,aiHand)
        else:
            if(checkStraight(userHand) and checkStraight(aiHand) == False):
                print("You are the Winner with a Straight!")
                print("You have won $" + str((userBet * 2)))
            elif(checkStraight(aiHand) and checkStraight(userHand) == False):
                print("You Lost to a Straight!")
                print("You have lost your $" + str(userBet))
            elif(checkStraight(aiHand) and checkStraight(userHand)):
                print("You both had Straights so...")
                checkHighCards(userHand,aiHand)
            else:
                if(checkFlush(userHand) and checkFlush(aiHand) == False):
                    print("You are the Winner with a Flush!")
                    print("You have won $" + str((userBet * 2)))
                elif(checkFlush(aiHand) and checkFlush(userHand) == False):
                    print("You Lost to a Flush!")
                    print("You have lost your $" + str(userBet))
                elif(checkFlush(aiHand) and checkFlush(userHand)):
                    print("You both had Flushes so...")
                    checkHighCards(userHand,aiHand)
                else:
                    if(checkPairs(userHand) and checkPairs(aiHand) == False):
                        print("You are the Winner with a Pair!")
                        print("You have won $" + str((userBet * 2)))
                    elif(checkPairs(aiHand) and checkPairs(userHand) == False):
                        print("You Lost to a Pair!")
                        print("You have lost your $" + str(userBet))
                    elif(checkPairs(aiHand) and checkPairs(userHand)):
                        print("You both had Pairs so...")
                        checkHighCards(userHand,aiHand)
                    else:
                        checkHighCards(userHand,aiHand)


#checkStraightFlush will pass in a hand and return true if it has a straight flush
def checkStraightFlush(hand):
    if(checkStraight(hand) and checkFlush(hand)):
        return True
    else:
        return False

#checkHighCards will pass in two hands and determine which hand has the higher cards,
#   prints out winner or if there is a push.
def checkHighCards(uHand,cHand):
    #Sorts the hands
    uHand.sort()
    cHand.sort()
    
    #Checking high cards
    if getCardRank(uHand[2]) > getCardRank(cHand[2]):
        print("User wins with a high card")
        print("You have won $" + str((userBet * 2)))
    elif getCardRank(uHand[2]) < getCardRank(cHand[2]):
        print("AI wins with a high card")
        print("You have lost your $" + str(userBet))
    else:
        if getCardRank(uHand[1]) > getCardRank(cHand[1]):
            print("User wins with 2 high cards")
            print("You have won $" + str((userBet * 2)))
        elif getCardRank(uHand[1]) < getCardRank(cHand[1]):
            print("AI wins with 2 high cards")
            print("You have lost your $" + str(userBet))
        else:
            if getCardRank(uHand[0]) > getCardRank(cHand[0]):
                print("User wins with 3 high cards")
                print("You have won $" + str((userBet * 2)))
            elif getCardRank(uHand[0]) < getCardRank(cHand[0]):
                print("AI wins with 3 high cards")
                print("You have lost your $" + str(userBet))
            else:
                print("Push")
                print("Your $" + int(userBet) + " has been returned to you")


#checkPairs will pass in a single hand and will return true if there are any pairs in that hand.
def checkPairs(hand):
    #Checking if there is a pair
    hasPair = False
   

    if hand[0].value == hand[1].value or hand[1].value == hand[2].value:
        hasPair = True
    return hasPair


#getCardRank will pass in a single card and will give it an integer value so face cards are easily comparible.
#   The integer value will be returned.
def getCardRank(card):
    #takes a card object as a parameter and returns a value "rank" that can be used to compare standing between cards
    rank = 0
    if(card.value == "Jack"):
        rank = 11
    if(card.value =="Queen"):
        rank = 12
       
    if(card.value =="King"):
        rank = 13
    if(card.value =="Ace"):
        rank = 14
    elif(rank == 0):
        rank = int(card.value)
    return rank


#checkStraight will pass in a single hand and will return true if the hand has a straight.
def checkStraight(hand):
    #this function takes a SORTED hand as a parameter and will return true if the hand contains a straight
    handStraight = False
    #finds the rank the next card must have in order to have a straight
    valueNeededForStraight = getCardRank(hand[0]) + 1
    
    if(getCardRank(hand[1]) == valueNeededForStraight):
        valueNeededForStraight = valueNeededForStraight + 1
        if(getCardRank(hand[2]) == valueNeededForStraight):
            #we've looked at all cards in userhand can now decide if straight exists
            handStraight = True
    return handStraight


#checkFlush will pass in a single hand and will return true if the hand has a flush.
def checkFlush(hand):
    #this function takes a hand as a parameter and will return true if the hand contains a flush
    
    #Checking for a flush
    hasFlush = False
    if hand[0].suit == hand[1].suit and hand[1].suit == hand[2].suit:
        hasFlush = True
    return hasFlush


#checkTriple will pass in a single hand and will return true if the hand has a triple.
def checkTriple(hand):
    #this function takes a hand as a parameter and will return true if the hand contains a triple
    hasTriple = False

    #Checking if there is a triple
    if hand[0].value == hand[1].value and hand[1].value == hand[2].value:
        hasTriple = True
    
    return hasTriple


#Variables and deck declaration/shuffle
deck = pydealer.Deck()
deck.shuffle()
cheatDeck = pydealer.Deck()
betLoop = True


#Try/catch for acceptable user bet
while betLoop:
    try:
        userBet = int(input("Place your bet: "))
        if userBet > 0:
            betLoop = False
        else:
            print("Your bet must be greater than 0")
    except:
            print('You must enter an int')

print("\nYou have bet $" + str(userBet))


#Deciding to cheat based on the amount that the user bets
willCheat = False
cheatNum = userBet * math.log(userBet)/10 #since no base specified, uses e as base [ln(userBet)].
cheatNum = int(cheatNum)
if cheatNum < 10:
    cheatNum = 10
if cheatNum > 60:
    cheatNum = 60
randNum = random.randint(1,100)
if randNum <= cheatNum:
    willCheat = True



#Dealing cards to user and AI differently based on if the AI decided to cheat
if willCheat:
    #print("I AM CHEATING RIGHT NOW") #Used for debugging
    #toss cards from cheatDeck first
    playerHand = deck.deal(3)
    playerHand.sort()
    tossCards = cheatDeck.get(playerHand[0].value + " of " + playerHand[0].suit)
    tossCards = cheatDeck.get(playerHand[1].value + " of " + playerHand[1].suit)
    tossCards = cheatDeck.get(playerHand[2].value + " of " + playerHand[2].suit)
    
    #Checks if the player could make a hand and runs that specific cheating algorithm
    if(checkStraightFlush(playerHand)):
        #If the player has a straight flush it will change their hand
        tossCards = cheatDeck.get(playerHand[0].value)
        tossCards = cheatDeck.get(playerHand[1].value)
        tossCards = cheatDeck.get(playerHand[2].value)
        tossCards = cheatDeck.get(playerHand[0].suit)
        tossCards = cheatDeck.get(playerHand[1].suit)
        tossCards = cheatDeck.get(playerHand[2].suit)
        tossCards = playerHand.get(1)
        playerHand += cheatDeck.deal(1)
        playerHand.shuffle()
        computerHand = cheatDeck.deal(3)
        computerHand.shuffle()
    elif(checkTriple(playerHand)):
        #Always gives computer a straight flush
        tossCards = cheatDeck.get(playerHand[0].suit)
        tossCards = cheatDeck.get(playerHand[1].suit)
        tossCards = cheatDeck.get(playerHand[2].suit)
        randSFNum = random.randint(0, (cheatDeck.size - 5))
        tossCards = cheatDeck.deal(randSFNum)
        computerHand = cheatDeck.deal(3)
        computerHand.shuffle()
    elif(checkStraight(playerHand)):
        #Always gives computer a triple
        tossCards = cheatDeck.get(playerHand[0].value)
        tossCards = cheatDeck.get(playerHand[1].value)
        tossCards = cheatDeck.get(playerHand[2].value)
        randTNum = random.randint(1, 12)
        tossCards = cheatDeck.deal(randTNum * 4)
        computerHand = cheatDeck.deal(3)
        computerHand.shuffle()
    elif(checkFlush(playerHand)):
        #Always gives the computer a triple
        tossCards = cheatDeck.get(playerHand[0].suit)
        tossCards = cheatDeck.get(playerHand[0].value)
        tossCards = cheatDeck.get(playerHand[1].value)
        tossCards = cheatDeck.get(playerHand[2].value)
        randTNum = random.randint(1, 9)
        tossCards = cheatDeck.deal(randTNum * 3)
        computerHand = cheatDeck.deal(3)
        computerHand.shuffle()
    elif(checkPairs(playerHand)):
        #Always gives the computer a flush
        tossCards = cheatDeck.get(playerHand[0].suit)
        tossCards = cheatDeck.get(playerHand[1].suit)
        tossCards = cheatDeck.get(playerHand[2].suit)
        if cheatDeck.size == 13:
            cheatDeck.shuffle()
            computerHand = cheatDeck.deal(3)
        else:
            cheatDeck.shuffle()
            tossCards = cheatDeck.get(cheatDeck[0].suit)
            computerHand = cheatDeck.deal(3)
    else:
        #50% chance of Ace given or pair given
        randDecision = random.randint(0,1)
        if randDecision == 0: 
            #Always gives the computer a pair
            tossCards = cheatDeck.get(playerHand[0].value)
            tossCards = cheatDeck.get(playerHand[1].value)
            tossCards = cheatDeck.get(playerHand[2].value)
            randPNum = random.randint(1, 12)
            tossCards = cheatDeck.deal(randPNum * 4)
            computerHand = cheatDeck.deal(2)
            computerHand += deck.deal(1)
        elif randDecision == 1:
            #Always gives the computer an Ace/King
            #Technically has a small chance of still losing but this is done to avoid suspicion from constant pairs.
            randHCNum = random.randint(1,5)
            tossCards = cheatDeck.deal(randHCNum)
            computerHand = cheatDeck.deal(1)
            computerHand += deck.deal(2)
else:
    #No cheating involved, pure regular poker odds
    playerHand = deck.deal(3)
    computerHand = deck.deal(3)

#Displaying 2 cards to screen and keeping one hidden
print("\n**User hand**\n" + str(playerHand[0]) + "\n" + str(playerHand[1]) + "\n*Hidden Card*")
print("\n**AI hand**\n" + str(computerHand[0]) + "\n" + str(computerHand[1]) + "\n*Hidden Card*\n")


#Try/catch for acceptable raise to the bet
betLoop = True
while betLoop:
    try:
        userRaise = int(input("How much would you like to raise your bet by? (type '0' if you don't want to raise bet): "))
        if userRaise >= 0:
            userBet += userRaise
            betLoop = False
        else:
            print("You cannot lower your bet")
    except:
        print('You must enter an int')

if userRaise > 0:
    print("You have raised your bet to $" + str(userBet))
else:
    print("You have kept the same bet of $" + str(userBet))


#Revealing full hands to screen
print("\n**REVEALING CARDS**\n")
print("**User hand**\n" + str(playerHand))
print("\n**AI hand**\n" + str(computerHand) + "\n\n\n")

#Sorting then declaring winner
playerHand.sort()
computerHand.sort()
declareWinner(playerHand, computerHand)