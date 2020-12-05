var express = require("express");
var fs = require('fs'); 
var path = require('path'); 
var multer = require('multer'); 
var router = express.Router();
var mongoose = require('mongoose');
var Komik = mongoose.model('Komik');
var upload = require('./upload');

router.get('/',async(req,res)=>{
    //Show to main menu
    res.render('pages/addk');
});

router.post('/addn',  function(req,res){

    upload(req, res,(error) => {
        if(error){
           console.log(error);
        }else{
            var fullpath = "img/"+req.file.filename;
            var obj = {
                Judul : req.body.name,
                Author : req.body.author,
                Tahun : req.body.year,
                ISBN : req.body.ISBN,
                Lokasi : req.body.lokasi,
                Stok : req.body.stok,
                cover: fullpath,
                sinopsis : req.body.sinopsis,
                href : req.body.href,
                status : req.body.status,
        
            };
            var komik = new Komik(obj);
            komik.save(function(error){
                if(error){
                    throw error;
                }
                res.redirect('/listk');
            });
              
           
        
      }
    });    
    
    //const status = req.body.status;



});

module.exports = router;