const express = require('express');
const bodyParser = require('body-parser');
const layouts = require('express-ejs-layouts');
const session = require('express-session'); //Not used due no login sesssion needed for user
var mongoose = require('mongoose');
var multer = require('multer');
const app = express();

//Layout
app.use(layouts);
app.set('layout','layouts/main.ejs');

//Place layout on head
app.set("layout extractStyles", true);
//place layout on end
app.set("layout extractScripts", true);

//Set engine to EJS
app.set('view engine','ejs');

app.use(bodyParser.urlencoded());
app.use(bodyParser.json());

//Use static files
app.use('/public',express.static('public'));

//Session 
app.use(session({
    secret: 'some_secret_key',
    cookie: {}
})) 

mongoose.connect(
    "mongodb://127.0.0.1:27017/db-dugongbookstore",
    { useNewUrlParser: true, useUnifiedTopology: true}
);
mongoose.Promise = global.Promise;
require('./models/novelSchema');
require('./models/komikSchema');
require('./models/bookSchema');
//Routing

const index = require('./routes/index');
const komik = require('./routes/index');
const novel = require('./routes/index');
const promo = require('./routes/promo');
const search = require('./routes/search');

const adminlogin = require('./routes/adminlogin');

// const details = require('./routes/details');
const add = require('./routes/add');
const addk = require('./routes/addk');
const list = require('./routes/list');
const listn = require('./routes/listn');
const listk = require('./routes/listk');

app.use('/',index);
app.use('/komik',komik);
app.use('/novel',novel);
// app.use('/details', details);
app.use('/promo',promo);
app.use('/search',search);
app.use('/add',add);
app.use('/list',list);
app.use('/addk',addk);
app.use('/listn',listn);
app.use('/listk',listk);
app.use('/me7rhg',adminlogin);

//Start node
const port = 3000;
app.listen(port);
console.log(`Running on localhost:${port}`);