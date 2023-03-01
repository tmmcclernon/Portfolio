var MongoClient = require('mongodb').MongoClient;
const config = require('./config.json');

const mycollection = config.mycollection;
const myDB = config.myDB;
const url = "mongodb+srv://"+config.username+":" + config.pwd +"@cluster0.yjzs4.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";

//sets up the collection
exports.setup = function () {
    let cbackfunc;
    createdb(cbackfunc);
    createcl(cbackfunc);
};

//creates the database
let createdb = function (callbackFn) {
    MongoClient.connect(url, {useNewUrlParser: true, useUnifiedTopology: true}, function (err, db) {
        if (err) throw err;
        console.log("Database created!");
        db.close();
    });
};

//creates collection
let createcl = function (callbackFn) {
    MongoClient.connect(url, {useNewUrlParser: true, useUnifiedTopology: true}, function (err, db) {
        if (err) throw err;
        if (!myDB) {
          console.log("ERROR: Collection undefined. Fix myDB in config file");
          return;
        } 
        var dbo = db.db(myDB);
        dbo.createCollection(mycollection, function (err, res) {
            if (err) throw err;
            console.log("Collection created!");
            db.close();
        });
    });
};

//inserts a record of myobj into the database
exports.insertRec = function (myobj) {
    console.log("called insert rec")
    MongoClient.connect(url, {useNewUrlParser: true, useUnifiedTopology: true}, function (err, db) {
        if (err) throw err;
        var dbo = db.db(myDB);
        dbo.collection(mycollection).insertOne(myobj, function (err, res) {
            if (err) throw err;
            console.log("1 document inserted into the database.");
            db.close();
        });
    });
};

//finds a single record with information contained in data (if not found data is inserted)
exports.findRec = function (data, callbackFn) {
    console.log("looking for "+ JSON.stringify(data))
    MongoClient.connect(url, {useNewUrlParser: true, useUnifiedTopology: true}, function (err, db) {
        if (err) throw err;
        var dbo = db.db(myDB);
        dbo.collection(mycollection).findOne(data, function (err, result) {
            if (err) throw err;
            console.log("result="+result);
            exports.insertIfNotFound(result,data)
            db.close();
        });
    });
};
//finds a record w/ info passed in via data parm
exports.findData = function (data, callbackFn) {
    console.log("looking for "+ JSON.stringify(data))
    MongoClient.connect(url, {useNewUrlParser: true, useUnifiedTopology: true}, function (err, db) {
        if (err) throw err;
        var dbo = db.db(myDB);
        dbo.collection(mycollection).findOne(data, function (err, result) {
            if (err) throw err;
            console.log("result="+result);
            db.close();
        });
    });
    callbackFn
};
//finds a score base off of the username of the player
exports.findUserScore = function (username, callbackFn) {
    console.log("looking for "+ JSON.stringify(username)+" score")
    MongoClient.connect(url, {useNewUrlParser: true, useUnifiedTopology: true}, function (err, db) {
        if (err) throw err;
        var dbo = db.db(myDB);
        dbo.collection(mycollection).findOne(username, function (err, result) {
            if (err) throw err;
            console.log(result['score']);
            db.close();
        });
    });
};
//use this as a callback for findRec to insert new record if unique name not found
exports.insertIfNotFound = function(result,username){
    if(result == null){
        console.log("no match: new user");
        MongoClient.connect(url, {useNewUrlParser: true, useUnifiedTopology: true}, function (err, db) {
            if (err) throw err;
            var dbo = db.db(myDB);
            dbo.collection(mycollection).insertOne((username), function (err, res) {
                if (err) throw err;
                console.log("1 document inserted into the database.");
                //intialize score to 0
                exports.updateData(username,{score: 0})
                db.close();
            });
        });
       
    }
    else{
        console.log("match: Username already exists")
    }

}
//finds all records using a limit (if limit is 0 all records are returned)
exports.findAll = function (limit,callbackFn) {
    MongoClient.connect(url, {useNewUrlParser: true, useUnifiedTopology: true}, function (err, db) {
        if (err) throw err;
        var dbo = db.db(myDB);
        dbo.collection(mycollection).find({}).limit(limit).toArray(function (err, result) {
            if (err) throw err;
            console.log(result);
            db.close();
        });
    });
};
exports.sortAll = function (callbackFn) {
    MongoClient.connect(url, {useNewUrlParser: true, useUnifiedTopology: true}, function (err, db) {
        if (err) throw err;
        var dbo = db.db(myDB);
        dbo.collection(mycollection).find().sort({score: -1}),(function (err, result) {
            if (err) throw err;
            console.log(result)
            res.send(result);
            db.close();
        });
    });
};
//find and sort all records in the database
//writes all records to response using a limit (if limit is 0 all records are returned)
exports.writeAll = function (limit,res,callback) {
    MongoClient.connect(url, {useNewUrlParser: true, useUnifiedTopology: true}, function (err, db) {
        if (err) throw err;
        var dbo = db.db(myDB);
        dbo.collection(mycollection).find().sort({score: -1}).limit(limit).toArray(function (err, result) {
            if (err) throw err;
            console.log(result)
            res.send(result);
            db.close();
        });
    });
    
};

//finds a record w/ info passed in via data parm
exports.updateHighScore = function (usernameQuery, newScore, callbackFn) {
    console.log("looking for "+ JSON.stringify(newScore))
    MongoClient.connect(url, {useNewUrlParser: true, useUnifiedTopology: true}, function (err, db) {
        if (err) throw err;
        var dbo = db.db(myDB);
        dbo.collection(mycollection).findOne(usernameQuery, function (err, result) {
            if (err) throw err;
            console.log(newScore)
            if(result == null){
                console.log("no highscore found")
                db.close()
            }
            else{
                oldScore = result['score']
                console.log("old score found "+oldScore)
            if(newScore > oldScore && newScore!= null){
               exports.updateData(usernameQuery,{score: newScore})
               db.close();
            }
        }
            db.close();
        });
    });
    
};
//deletes a collection
exports.deleteCollection = function (callbackFn) {
    MongoClient.connect(url, {useNewUrlParser: true, useUnifiedTopology: true}, function (err, db) {
        if (err) throw err;
        var dbo = db.db(myDB);
        dbo.collection(mycollection).drop(function (err, delOK) {
            if (err) throw err;
            if (delOK)
                console.log("Collection deleted.");
            db.close();
        });
    });
};
//updates a user's score in the database if it is higher than their previously recorded score

//updates queryData's data in the database to newdata
exports.updateData = function (queryData, newdata, callbackFn) {
    console.log("updating:")
    console.log(queryData)
    console.log("updating query w/:")
    console.log(newdata)
    MongoClient.connect(url, {useNewUrlParser: true, useUnifiedTopology: true}, function (err, db) {
        if (err) throw err;
        var dbo = db.db(myDB);
        dbo.collection(mycollection).updateOne(queryData, {$set: newdata}, function (err, res) {
            if (err) throw err;
            console.log("1 document updated.");
            db.close();
        });
    });
};


