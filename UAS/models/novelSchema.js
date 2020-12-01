const mongoose = require("mongoose");

//Type 1
var novelSchema = mongoose.Schema({
    //img: String,
    Judul: String,
    Author: String,
    Tahun: String,
    ISBN: String,
    Lokasi: String,
    Stok: Number,
    cover: String
    /*{
        data: Buffer,
        contentType: String
    }*/,
    sinopsis: String,
    href: String,
    status: String
},{
    collection: 'novel'
});

const Novel = mongoose.model('Novel',novelSchema);

module.exports = Novel;