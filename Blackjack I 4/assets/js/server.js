/////////////////////////////////////////////////////////////////////////////////
//Author: Tommy McClernon
//Purpose: Create a Server for Blackjack Advice
/////////////////////////////////////////////////////////////////////////////////
//server.js
//load HTTP module
const http = require('http');
//load url module
const url = require('url');
//load file system module
const myFS = require('fs')
//load local quote generator module
const blackjackadvice = require('./blackjackadvice.js');
const { error } = require('console');
const { DH_CHECK_P_NOT_SAFE_PRIME } = require('constants');

//set up server
const hostname = '127.0.0.1';
const port = 3000;


//create server

const server = http.createServer((req, res) => {
    function determineStatusCode(status){
        if (status == "Error"){
            code =  404;
        }
        if(status == "Success"){
            code = 200;
        }
        res.statusCode = code;
    }
    var errormsg = "\n 404: Invalid Data Scores should be numeric values!"


    //setup response headers
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Content-Type', 'text/json');
    var myURL = url.parse(req.url,true);
    function generateMessage(){
        res.write(JSON.stringify(blackjackadvice.hint))
        if(blackjackadvice.hint.status == "Error"){
            
            res.write(errormsg)
        }
    }
    (blackjackadvice.generateAdvice(myURL.query.userscore, myURL.query.dealerscore),determineStatusCode(blackjackadvice.hint.status),generateMessage())
    res.end()
    
   
   
    


  


    

});

//start server listening
// if using replit  use server.listen( () => {
server.listen(port, hostname,function(error){
    console.log(`Server running at http://${hostname}:${port}/`);
 
  
    
});
