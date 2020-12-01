const express = require("express");

var MongoClient = require('mongodb').MongoClient,
    dbURL = "mongodb://127.0.0.1:27017",
    dbName = "db-dugongbookstore"

const router = express.Router();

router.get('/',async(req,res)=>{
    //Show to main menu
    res.render('pages/index');
});

//Need FIND function, then push to DB if not found.
//Currently, push is OK.
router.post('/email', (req,res)=>{
    //Get email
    const newsLetter = req.body.newsLetter;
    //Connect to DB
    MongoClient.connect(dbURL, function(err,client){
        if (err){
            throw err;
        }
        //Function to push ONE DATA
        let db = client.db(dbName);
        db.collection("emails")
        .insertOne({ email: newsLetter},(err,db)=>{
            if (err) throw err;
            res.render('pages/index');
        })
        console.log("Email registered on DB."); //Confirmation if OK to push
    });
});

module.exports = router;