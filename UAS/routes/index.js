const express = require("express");

const User = require('../models/emailSchema');

const router = express.Router();

router.get('/',async(req,res)=>{
    //Show to main menu
    res.render('pages/index');
});

//Post still error, not detected.
router.post('/index',async(req,res)=>{
    const input = req.body.email;

    User.find({email: input}).exec((err,data)=>{
        if (data) console.log("Email ditemukan");
        else{
            console.log("Email tidak ditemukan. BISA DI PUSH");
        }
    });
/* 
    User.insertOne({email:input},(err,raw)=>{
        User.find({email:input}).exec((err,data)=>{
            if (data) console.log("No inputed email in database.");
            else {
                console.log("Email sudah terdaftar");
            }
        });
    }); */
});


module.exports = router;