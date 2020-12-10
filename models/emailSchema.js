const mongoose = require("mongoose");
mongoose.connect(
    "mongodb+srv://dugong:dugong2020@dugongcluster.u7uok.mongodb.net/db-dugongbookstore",
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