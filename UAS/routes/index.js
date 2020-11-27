const express = require("express");
const bcrypt = require('bcrypt');

var MongoClient = require('mongodb').MongoClient,
    dbURL = "mongodb://127.0.0.1:27017",
    dbName = "db-dugongbookstore"

const member = require('../models/Member');
const router = express.Router();

router.get('/adminlogin', async (req, res) => {
    if (req.session.user) {
      res.redirect('/');
    } else {
      res.render('pages/adminlogin', { layout: false });
    }
  });
  router.post('/adminlogin', async (req, res) => {
    // get user input
    const username = req.body.username;
    const password = req.body.password;
    
    member.find({"username": username}).exec((error, data) => {
      if (error) console.log(JSON.stringify(error));
      if (data){
        console.log("Find: " + JSON.stringify(data));
        bcrypt.compare(password, data[0].password, function(err, isMatch) {
          if (err) {
            throw err;
          } else if (!isMatch) {
            console.log("Password didn't match!");
          } else {
            req.session.user = username;
            res.redirect('/');
          }
        })
        
      }
    });
  });
  
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