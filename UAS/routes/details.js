const express = require('express');
const router = express.Router();
const book = require('../models/NovelMember')

var MongoClient = require('mongodb').MongoClient,
    dbURL = "mongodb+srv://dugong:dugong2020@dugongcluster.u7uok.mongodb.net/test",
    dbName = "db-dugongbookstore"

router.get('/', async(req, res) => {
    const isbn = req.params.ISBN;
    MongoClient.connect(dbURL, (err, book) => {
        if (err) {
            throw err;
        }
        let db = book.db(dbName);
        db.collection("book").find({ISBN: isbn}).toArray((err, data) => {
            if (err) throw err;
            res.render('pages/details', {det: data});
        })
    });
});
module.exports = router;