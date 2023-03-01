//Author: Nnamdi Nwanze
//Description: This routes module creates custom routes and demonstrates the use of routes using the database manager module

var express = require('express');
var router = express.Router();
var player1Stats = "game in progress come back when player 2's round is over"
var player2Stats = "game in progress come back when player 1's round is over"
var player1Score = {}
var player2Score = {}
 
//use database manager module
var mydb = require('./dbmgr.js');

//use the url module
const url = require('url');
const { query } = require('express');
const { Db } = require('mongodb');

//setup route /
router.get('/', function (req, res) {
    res.send(JSON.stringify('Welcome to the main page'));
    console.log("Here are all records:")
    mydb.findAll(0)
});
router.post('/username',function(req,res){
    username = (req.body)
    res.send("adding username to database")
   
    console.log("this is the username: "+ JSON.stringify(username))
    //store unique usernames in database
   mydb.findRec(username)
   
   
    
    
});
//setup route /player1
router.get('/player1', function (req, res) {
    var myURL = url.parse(req.url, true)
    gameStatus = myURL.query.gameState
    if(gameStatus == "ongoing"){
        res.send("There is an ongoing game please come back when the game is over")
    }
    else{
        player1Stats = myURL.query
        player1Score = myURL.query.score
        console.log("player 1's stats were recorded:")
        console.log(player1Stats)
        console.log("player 1 last recorded score is:")
        console.log(player1Score)
        //updates data if the user's recorded score in the database is less than the new score 
        console.log("Preping user name:")
        console.log(myURL.query.playerName)
        //update the player in the database that matches the username,
        //but only if the saved score in database is less than what the player currently has 
        if(player1Score > 0){
            mydb.updateHighScore({username: myURL.query.playerName},Number(player1Score))
        }
        res.send(player2Stats)  
    }
   
});
//setup route /player2
router.get('/player2', function(req,res){
    var myURL = url.parse(req.url, true)
    gameStatus = myURL.query.gameState
    if(gameStatus == "ongoing"){
        res.send("There is an ongoing game please come back when the game is over")
    }
    player2Stats = myURL.query
    player2Score = myURL.query.score
    console.log("Player 2's stats were recorded")
    console.log(player2Stats)
    console.log("Player 2's last recorded score is:")
    console.log(player2Score)
    console.log("Preping user name:")
    console.log(myURL.query.playerName)
    //update the player in the database that matches the username,
    //but only if the saved score in database is less than what the player currently has 
    if(player2Score > 0){
        mydb.updateHighScore({username: myURL.query.playerName},Number(player2Score))
    }
    res.send(player1Stats)

   
    
});
//setup route /highscorres
router.get('/highscores', function(req,res){
    mydb.sortAll()
    mydb.writeAll(0,res)
    

});
//Setup database, only need to run this once. Unblock to run once then block this line again
//mydb.deleteCollection();
//mydb.setup();







module.exports = router;