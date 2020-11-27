const express = require('express');

var MongoClient = require('mongodb').MongoClient,
    dbURL = "mongodb://127.0.0.1:27017",
    dbName = "db-dugongbookstore"

const router = express.Router();

router.get('/',async(req,res)=>{
    //Show to novel
    MongoClient.connect(dbURL, function(err,client){
        if (err){
            throw err;
        }
        //Function to read ALL DATA
        let db = client.db(dbName);
        db.collection("novel")
        .find()
        .toArray((err,data)=>{
            if (err) throw err;
            res.render('pages/novel', {novel: data});
        })
    });
});

module.exports = router;