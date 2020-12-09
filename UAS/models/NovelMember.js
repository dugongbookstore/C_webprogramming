const monggose = require("mongoose");
const { model } = require("./Member");
const db = monggose.connection;

db.once("open", () => {
    console.log("Connection established.");
})
const memberSchema = monggose.Schema({
    Judul: String,
    Author: String,
    Tahun: String,
    ISBN: String,
    Lokasi: String,
    Stok: Number,
    Cover: String,
    Sinopsis: String
});model("Member", memberSchema);
module.exports = Member;