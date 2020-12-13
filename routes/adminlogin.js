const express = require('express');
const bcrypt = require('bcrypt');
const mongoose = require('mongoose');

mongoose.connect(
  "mongodb+srv://dugong:dugong2020@dugongcluster.u7uok.mongodb.net/db-dugongbookstore",
  {useNewUrlParser: true}

);
const db = mongoose.connection;
db.once("open", () =>{
  console.log("Successfully connected to MongoDB using Mongoose!");
});

const member = require('../models/Member');
const router = express.Router();

//Login - Force
router.get('/login', async (req, res) => {
  if (req.session.user) {
    res.redirect('/');
  } else {
    res.render('pages/adminlogin', { layout: false });
  }
});

//Logout
router.get('/logout', async (req, res) => {
  req.session.destroy();
  res.redirect('/me7rhg/login');
});

//Login Progress
router.post('/login', async (req, res) => {
  // get user input
  const username = req.body.username;
  const password = req.body.password;
if(username === "dugong"){  
  member.find({"username": username}).exec((error, data) => {
    if (error) console.log(JSON.stringify(error));
    if (data){
      bcrypt.compare(password, data[0].password, function(err, isMatch) {
        if (err) {
          throw err;
        } else if (!isMatch) {
          console.log("401 - Not Authorized");
          res.render('pages/adminlogin', { layout: false, error: 'Wrong username or password!' } );
        } else {
          req.session.user = username;
          res.redirect('/list');
        }
      })
    }
  });
}else{
  console.log("401 - Not Authorized");
    res.render('pages/adminlogin', { layout: false, error: 'Wrong username or password!' } );
  }
});

module.exports = router;