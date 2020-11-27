const mongoose = require("mongoose");
mongoose.connect(
  "mongodb://127.0.0.1:27017/db-dugongbookstore",
  {useNewUrlParser: true}
);
const db = mongoose.connection;
db.once("open", () =>{
  console.log("Successfully connected to MongoDB using Mongoose!");
});    
var memberSchema = mongoose.Schema({
        username: String,
        password: String
    },{
        collection: 'admin'
    });
module.exports = mongoose.model("Member", memberSchema);
