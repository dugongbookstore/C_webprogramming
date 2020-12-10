const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;
const layout = require('express-ejs-layouts');
const mongoose = require("mongoose");

//mongoose
mongoose.connect(
    "mongodb://127.0.0.1:27017/db-dugong-bookstore",
    { useNewUrlParser: true }
);
const db = mongoose.connection;
db.once("open", () => {
    console.log("Successfully connected to MongoDB using Mongoose!");
});

const Member = require('./models/Member');

//use layouts
app.use(layout);
app.set('layout', 'layout/main.ejs');

//place all styles block in the layout
app.set("layout extractStyles", true)
//place all scripts block in the layout at the end
app.set("layout extractScripts", true)

//set the view engine to ejs
app.set('view engine', 'ejs');

//body-parser to parse request body
app.use(bodyParser.urlencoded());

//static files
app.use('/public', express.static('public'));

//routes
const index = require('./routes/index');
const komik = require('./routes/komik');
const promo = require('./routes/promo');
const novel = require('./routes/novel');
const search = require('./routes/search');
app.use('/', index);
app.use('/komik', komik);
app.use('/promo', promo);
app.use('/novel', novel);
app.use('/search', search);

//start server on port 3000
app.listen(port);
console.log(`Server berjalan pada port ${port}`);