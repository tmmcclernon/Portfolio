/////////////////////////////////////////////////////////////////////////////////
//Author: Nnamdi Nwanze
//Purpose: Controls the bidirectional sockets of an MVC hangman game
/////////////////////////////////////////////////////////////////////////////////
//mySocket.js
var myURL = "http://127.0.0.1:3000";
var socket = io(myURL, {secure: true});
$.ajax({
    url: myURL,
    type: 'GET',
    success: function (data) {
        socket.emit('emit_from_here');
    }
});
socket.on('broadcast', function (data) {
    if (data.description !== null)
        showNumberOfPlayers(data.description);
    if (data.username !== undefined) {
        showPlayerScore(data);
    }
        
});
//update user scores when round is over
function updateSocketOnRoundOver() {
    //send username and score over sockets
    var data = {
        username: gamePlay.getUsername(),
        score: gamePlay.Hangman.player.getScore()
    }
    socket.emit('roundOver', data);
}
