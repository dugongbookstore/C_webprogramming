const express = require('express');
const { $where } = require('../models/bookSchema');

var MongoClient = require('mongodb').MongoClient,
    dbURL = "mongodb://127.0.0.1:27017",
    dbName = "db-dugongbookstore"

const router = express.Router();
var bookModel = require('../models/bookSchema');

router.get('/',async(req,res)=>{
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
});
//Recommend
router.post('/rec/:isbn', async(req,res)=>{
    const isbn = req.params.isbn;
    console.log(isbn);
    bookModel.updateOne({ISBN: isbn},{rec: true},(err,raw)=>{
        bookModel.find({ISBN: isbn}).limit(1).exec((err,data)=>{
            if (err) throw err;
            console.log("Updated.");
            res.redirect('/list');
        })
    })
})
//Delete
router.post('/delete/:isbn', async(req,res) => {
    const isbn = req.params.isbn;
    console.log(isbn);
    MongoClient.connect(dbURL, function(err,client){
        if (err){
            throw err;
        }
        
        let db = client.db(dbName);

        //Function to FIND DATA
        db.collection("book").find({ISBN: isbn}).toArray((err,arr)=>{
            if (err) throw err;
            else if (arr.length === 0){
                console.log("No book.");
            } else {
                console.log(isbn);
                db.collection("book").deleteOne({ ISBN: isbn},(err,data)=>{
                    if (err) throw err;
                    res.redirect('/list');
                })
                console.log("Deleted."); 
            }
        });
    });
});

// router.post('/edit/:ISBN', async(req,res) => {
//     const isbn = req.params.ISBN;
//     console.log(isbn);
//     MongoClient.connect(dbURL, function(err,client){
//         if (err){
//             throw err;
//         }
        
//         let db = client.db(dbName);

//         //Function to FIND DATA
//         db.collection("book").find({ISBN: isbn}).toArray((err,arr)=>{
//             if (err) throw err;
//             else if (arr.length === 0){
//                 console.log("No book.");
//             } else {
//                 db.collection("book").find({ ISBN: isbn},(err,data)=>{
//                     if (err) throw err;
//                     res.redirect('/edit/:ISBN');
//                 })
//                 // res.render('pages/index',{ error: "Email yang diinput sudah terdaftar!"} );
//                 // console.log("Edit"); //Confirmation if NOT OK to push
//             }
//         });
//     });
// });

module.exports = router;