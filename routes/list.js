const express = require('express');
const { $where } = require('../models/bookSchema');

var MongoClient = require('mongodb').MongoClient,
    dbURL = "mongodb+srv://dugong:dugong2020@dugongcluster.u7uok.mongodb.net/db-dugongbookstore",
    dbName = "db-dugongbookstore"

const router = express.Router();
var bookModel = require('../models/bookSchema');
var mongoose = require('mongoose');
const upload = require('./upload');
var Book = mongoose.model('Book');

router.get('/',async(req,res)=>{
    if(!req.session.user) {
        res.redirect('/me7rhg/login')
    }
    else {
        MongoClient.connect(dbURL, function(err,client){
            if (err){
                throw err;
            }
            //Function to read ALL DATA
            let db = client.db(dbName);
            db.collection("book").find().toArray((err,data)=>{
                if (err) throw err;
                res.render('pages/list', {book: data})
            })
        });
    }
});
//Recommend
router.post('/rec/:isbn', async(req,res)=>{
    const isbn = req.params.isbn;
    bookModel.updateOne({ISBN: isbn},{rec: true},(err,raw)=>{
        bookModel.find({ISBN: isbn}).limit(1).exec((err,data)=>{
            if (err) throw err;
            res.redirect('/list');
        })
    })
})
//Not Recommend
router.post('/unrec/:isbn', async(req,res)=>{
    const isbn = req.params.isbn;
    bookModel.updateOne({ISBN: isbn},{rec: false},(err,raw)=>{
        bookModel.find({ISBN: isbn}).limit(1).exec((err,data)=>{
            if (err) throw err;
            res.redirect('/list');
        })
    })
})
//Delete
router.post('/delete/:isbn', async(req,res) => {
    const isbn = req.params.isbn;
    MongoClient.connect(dbURL, function(err,client){
        if (err){
            throw err;
        }
        
        let db = client.db(dbName);

        //Function to FIND DATA
        db.collection("book").find({ISBN: isbn}).toArray((err,arr)=>{
            if (err) throw err;
            else if (arr.length === 0){
                console.log("404 - No book.");
            } else {
                db.collection("book").deleteOne({ ISBN: isbn},(err,data)=>{
                    if (err) throw err;
                    res.redirect('/list');
                })
            }
        });
    });
});

//Edit - get ISBN
router.get('/edit/:isbn', async(req,res)=>{
    const isbn = req.params.isbn;
    bookModel.find({ISBN: isbn}).limit(1).exec((err,data)=>{
        if (err) throw err;
        res.render('pages/edit',{book: data});
    });
});
//Edit - Post update
router.post('/update',  function(req,res){
    //Function upload dari multer, bukan dari mongoose. Harus dipake kalo mau upload
    //gambar.
    upload(req,res,(error)=>{
        if(error){
            console.log(error);
        }
        else{
            var fullpath = req.file.filename;
            if (!req.file.filename.includes("img/")) {
                var fullpath = "img/"+req.file.filename;
            }
            else {
                fullpath = req.file.filename;
            } 
            Book.updateOne({ISBN: req.body.ISBN},
                {Status: req.body.status, Type: req.body.type,
                Judul: req.body.name, Author: req.body.author,
            Tahun: req.body.year, ISBN: req.body.ISBN,
            Pos: req.body.lokasi, Stok: req.body.stok,
            cover: fullpath, sinopsis: req.body.sinopsis,
            rec: false},(err,raw)=>{
                Book.find({ISBN: req.body.ISBN}).limit(1).exec((err,data)=>{
                    if (data) res.redirect('/list');
                });
            });
        }
    }) 
});

module.exports = router;