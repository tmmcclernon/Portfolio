/////////////////////////////////////////////////////////////////////////////////
//Author: Nnamdi Nwanze
//Purpose: Sets up an express server for a multiplayer MVC hangman game
/////////////////////////////////////////////////////////////////////////////////
//server.js
var app = require('express')();
var http = require('http').Server(app);
const cors = require('cors');
const io = require("socket.io")(http, {cors: {origin: "*", methods: ["GET", "POST"]}});
const bodyParser = require('body-parser')
//CORS
app.use(cors());
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json())
//setup routes /
const routes = require('./routes')
app.use("/",routes);
app.use("/username", routes)
app.use("/player1",routes)
app.use("/player2", routes)
app.use("/highscores", routes)


var players = 0;
io.on('connection', function (socket) {
    //increment number of players
    players++;
    //broadcast number of players when players connect
    io.sockets.emit('broadcast', {description: players + ' players are here!'});
    //broadcast scores when game round is over
    socket.on('roundOver', function(data){
        io.sockets.emit('broadcast', {description: players + ' players  are here.', username: data.username, score:data.score});
   });
   //broadcast number of players when players disconnect
    socket.on('disconnect', function () {
        players--;
        io.sockets.emit('broadcast', {description: players + ' players  are here!'});
    });
});

http.listen(3000, function () {
    console.log('listening on http://127.0.0.1:3000');
});
