const express = require('express');
const bcrypt = require('bcrypt');
const mongoose = require('mongoose');
mongoose.connect(
  "mongodb://127.0.0.1:27017/db-dugongbookstore",
  {useNewUrlParser: true}
);
const db = mongoose.connection;
db.once("open", () =>{
  console.log("Successfully connected to MongoDB using Mongoose!");
});

const member = require('../models/Member');
const router = express.Router();

router.get('/login', async (req, res) => {
  if (req.session.user) {
    res.redirect('/');
  } else {
    res.render('pages/adminlogin', { layout: false });
  }
});

router.post('/login', async (req, res) => {
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
          res.render('pages/adminlogin', { layout: false, error: 'Wrong username or password!' } );
        } else {
          req.session.user = username;
          res.redirect('/');
        }
      })
      
    }
  });
});

module.exports = router;