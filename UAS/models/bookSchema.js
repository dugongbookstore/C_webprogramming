const mongoose = require("mongoose");
mongoose.connect(
    "mongodb://127.0.0.1:27017/db-dugongbookstore.books",
    { useNewUrlParser: true}
);
const db = mongoose.connection;

db.once("open",()=> {
    console.log("Connection established using Mongoose.");
});
//Type 1
const bookSchema = mongoose.Schema({
    img: String,
    judul: String,
    author: String,
    year: String,
    isbn: String,
    pos: String,
    stock: Number,
    cover: String,
    sinopsis: String,
    loc: String
});

const Book = mongoose.model("Book",bookSchema);

module.exports = Book;