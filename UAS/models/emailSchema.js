const mongoose = require("mongoose");
mongoose.connect(
    "mongodb://127.0.0.1:27017/db-dugongbookstore",
    { useNewUrlParser: true}
);
const db = mongoose.connection;

db.once("open",()=> {
    console.log("Connection established using Mongoose.");
});
//Type 1
const emailSchema = mongoose.Schema({
    email: String
},{collection: 'emails'});

const User = mongoose.model("User",emailSchema);

module.exports = User;