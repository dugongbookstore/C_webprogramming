const mongoose = require("mongoose");

//Type 1
var komikSchema = mongoose.Schema({
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
    collection: 'komik'
});

const Komik = mongoose.model('Komik',komikSchema);

module.exports = Komik;