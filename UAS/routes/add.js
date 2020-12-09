var express = require("express");
var fs = require('fs'); 
var path = require('path'); 
var multer = require('multer'); 
var router = express.Router();
var mongoose = require('mongoose');
var Book = mongoose.model('Book');
var upload = require('./upload');

router.get('/',async(req,res)=>{
    //Show to main menu
    res.render('pages/add');
});

router.post('/list',  function(req,res){
    
    upload(req, res,(error) => {
        if(error){
           console.log(error);
        }else{
            var fullpath = "public/img/"+req.file.filename;
            var obj = {
                Status : req.body.status,
                Type : req.body.type,
                Judul : req.body.name,
                Author : req.body.author,
                Tahun : req.body.year,
                ISBN : req.body.ISBN,
                Pos : req.body.lokasi,
                Stok : req.body.stok,
                cover: fullpath,
                sinopsis : req.body.sinopsis,
                rec: false
            };
            const type = req.body.type;
            const book = new Book(obj);
            book.save(function(err){
                if (err) throw err;
                // ---------
                // res.render('pages/add', {msg : "Success."})
                res.redirect('/list')
                console.log("Added to DB");
            })
      }
    });    
});


module.exports = router;