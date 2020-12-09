const express = require("express");

var MongoClient = require('mongodb').MongoClient,
    dbURL = "mongodb://127.0.0.1:27017",
    dbName = "db-dugongbookstore"

const router = express.Router();

router.get('/',async(req,res)=>{
    //Show to main menu
    res.render('pages/index');
});

router.post('/email', (req,res)=>{
    //Get email
    const newsLetter = req.body.newsLetter;
    
    //Connect to DB
    MongoClient.connect(dbURL, function(err,client){
        if (err){
            throw err;
        }
        
        let db = client.db(dbName);

        //Function to FIND DATA
        db.collection("emails").find({email: newsLetter}).toArray((err,arr)=>{
            if (err) throw err;
            else if (arr.length === 0){
                //Function to push ONE DATA
                db.collection("emails").insertOne({ email: newsLetter},(err,db)=>{
                    if (err) throw err;
                    res.render('pages/index',{ msg: "Sukses terdaftar!"});
                })
                console.log("Email registered on DB."); //Confirmation if OK to push
            } else {
                //Send error
                // ------
                res.render('pages/index',{ error: "Email yang dimasukkan sudah terdaftar!"} );
                res.redirect('/#news');
                console.log("Email already registered on DB."); //Confirmation if NOT OK to push
            }
        });
    });
});

module.exports = router;