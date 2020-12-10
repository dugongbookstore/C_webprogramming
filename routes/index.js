const express = require("express");

var flash = require('express-flash');

var MongoClient = require('mongodb').MongoClient,
    dbURL = "mongodb+srv://dugong:dugong2020@dugongcluster.u7uok.mongodb.net/db-dugongbookstore",
    dbName = "db-dugongbookstore"

const router = express.Router();

router.get('/',async(req,res)=>{
    //Show to main menu
    MongoClient.connect(dbURL, function(err,client){
        if (err){
            throw err;
        }
        //Function to read ALL DATA
        let db = client.db(dbName);
        db.collection("book")
        .find({rec: true}).limit(5)
        .toArray((err,data)=>{
            if (err) throw err;
            // res.send(data)
            res.render('pages/index', {recom: data})
        })
    });
    // res.render('pages/index');
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
                    // res.render('pages/index',{ msg: "Sukses terdaftar!"});
                    req.flash('emailOK','Sukses terdaftar!');
                    res.redirect('/#news');
                })
                console.log("Email registered on DB."); //Confirmation if OK to push
            } else {
                //Send error
                // ------
                // res.render('pages/index',{ error: "Email yang dimasukkan sudah terdaftar!"} );
                req.flash('emailError','Email yang dimasukkan sudah terdaftar!');
                res.redirect('/#news');
                console.log("Email already registered on DB."); //Confirmation if NOT OK to push
            }
        });
    });
});

router.get('/novel', async(req,res)=>{
    //Show to novel
    MongoClient.connect(dbURL, function(err,client){
        if (err){
            throw err;
        }
        //Function to read ALL DATA
        let db = client.db(dbName);
        db.collection("book")
        .find({ Type: "novel" })
        .toArray((err,data)=>{
            if (err) throw err;
            // res.send(data)
            res.render('pages/novel', {novel: data});
        })
    });
});


router.get('/komik', async(req,res)=>{
    //Show to novel
    MongoClient.connect(dbURL, function(err,client){
        if (err){
            throw err;
        }
        //Function to read ALL DATA
        let db = client.db(dbName);
        db.collection("book")
        .find({ Type: "komik" })
        .toArray((err,data)=>{
            if (err) throw err;
            // res.send(data)
            res.render('pages/komik', {komik: data});
        })
    });
});

router.get('/public/:ISBN', async(req, res) => {
    const isbn = req.params.ISBN.toString();
    console.log(isbn);
    MongoClient.connect(dbURL, function(err,client){
        if (err){
            throw err;
        }
        //Function to read ALL DATA
        let db = client.db(dbName);
        db.collection("book")
        .find({ISBN: isbn})
        .toArray((err,data)=>{
            if (err) throw err;
            // res.send(data)
            res.render('pages/details', {detail: data})
            console.log(data);
        })
    });
});

router.get('/search', async(req,res)=>{
    res.render('pages/search', { sRes: []});
})

router.post('/result', (req,res)=>{
    //Get the query
    var target = req.body.sBox.toString();
    /* var newTarget = new RegExp(target, 'i'); */
    console.log(target);
    //Connect to DB
    MongoClient.connect(dbURL, function(err,client){
        if (err){
            throw err;
        }
        
        let db = client.db(dbName);

        //Function to FIND DATA
        db.collection("book").find(
            {$or:[{Judul: new RegExp(target, 'i')},{Author: new RegExp(target, 'i')},{Tahun: new RegExp(target, 'i')},{ISBN: new RegExp(target, 'i')}]}
        ).toArray((err,arr)=>{
            if (err) throw err;
            if (arr.length === 0){
                //return NOT FOUND
                res.render('pages/search',{msgError: "Buku tidak dapat ditemukan :("});
                console.log("Book no found");
            } 
            else {
                //return FOUND BOOK
                res.render('pages/search',{sRes: arr} );
                // res.send(arr);
                console.log("Book found");
            }
        });
    });
});

module.exports = router;