const mongoose = require("mongoose");
    
var memberSchema = mongoose.Schema({
        username: String,
        password: String
    },{
        collection: 'admin'
    });
module.exports = mongoose.model("Member", memberSchema);
