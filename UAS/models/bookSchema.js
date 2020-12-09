const mongoose = require("mongoose");

var bookSchema = mongoose.Schema({
    Status: String,
    Type: String,
    Judul: String,
    Author: String,
    Tahun: String,
    ISBN: String,
    Pos: String,
    Stok: Number,
    cover: String,
    sinopsis: String,
    Pos: String,
    rec: Boolean
},{
    collection: 'book'
});

const Book = mongoose.model("Book",bookSchema);

module.exports = Book;