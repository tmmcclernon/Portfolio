/////////////////////////////////////////////////////////////////////////////////
//Author: Tommy McClernon
//Purpose: Create a Server for Blackjack Advice
/////////////////////////////////////////////////////////////////////////////////
//blackjackadvice.js

const { json } = require("stream/consumers")


var hint ={
    status: "",
    content:{
        userscore: "",
        dealerscore: "",
        advice: ""
    },
   
}

    function generateAdviceHint(user, dealer){
        if(user >= 17){
            hint.content.advice = "Stay"
        }
        if(user <= 16){
            if(user >=13 && dealer<=5){
                hint.content.advice = "Stay"
            }
            if(user >=13 && dealer<=11){
                hint.content.advice = "Hit"
            }
            if(user <=12){
                hint.content.advice = "Hit"
            }
        }
        
    }
    



    
    
    function generateAdvice(userscore, dealerscore,callback,){
       
        hint.content.userscore = String(userscore)
        hint.content.dealerscore = String(dealerscore)
        //set up the hint
        done =false
        while(done==false){
        if((isNaN(userscore)==false) && (isNaN(dealerscore)==false)){ 
            console.log("valid data")
            hint.status = "Success"  
            adviceStatus = hint.status 
            generateAdviceHint(hint.content.userscore,hint.content.dealerscore)
            JSON.stringify(hint)
            callback
            done = true
        } 
         if((isNaN(userscore)==false) && (isNaN(dealerscore)==true)){
            console.log("invalid dealer")
            hint.content.dealerscore = 6 //assume dealer score is 6 since dealerscore is valid
            hint.status = "Success"
            adviceStatus = hint.status 
            generateAdviceHint(hint.content.userscore,hint.content.dealerscore)
            console.log(JSON.stringify(hint))
            callback
            done = true

        }
         if((isNaN(userscore)==true && isNaN(dealerscore) == false)){
            console.log("invalid user")
            hint.content.userscore = 14 //assume userscore is 14 since userscore is invalid
            hint.status = "Success"
            adviceStatus = hint.status 
            generateAdviceHint(hint.content.userscore,hint.content.dealerscore)
            console.log(JSON.stringify(hint))
            callback
            done = true
        }
         if((isNaN(userscore) == true && isNaN(dealerscore) == true)){
            //both values invalid
            console.log("both invalid")
            hint.status = "Error"
            adviceStatus = hint.status 
            console.log(JSON.stringify(hint))
            callback
            done = true
            
            
        }

        
  
    }
}

    
 

module.exports.generateAdvice = generateAdvice;
module.exports.hint = hint;  