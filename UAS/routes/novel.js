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

router.post('/details/:ISBN', async(req, res) => {
    const isbn = req.params.ISBN.toString();
    console.log(isbn);
    MongoClient.connect(dbURL, function(err,client){
        if (err){
            throw err;
        }
        //Function to read ALL DATA
        let db = client.db(dbName);
        db.collection("book")
        .find({ISBN: isbn})
        .toArray((err,data)=>{
            if (err) throw err;
            // res.send(data)
            res.render('pages/details', {detail: data})
        })
    });
})

module.exports = router;