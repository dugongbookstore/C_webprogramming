const mongoose = require("mongoose");
const db = mongoose.connection;

db.once("open",()=>{
    console.log("Connection established.");
})
const memberSchema = mongoose.Schema({
    email: String
});
const Member = mongoose.model("Member", memberSchema);
module.exports = Member;