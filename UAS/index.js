const express = require('express');
const bodyParser = require('body-parser');
const layouts = require('express-ejs-layouts');
const session = require('express-session'); 
const flash = require('express-flash');
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

//Use flash
app.use(flash());

mongoose.connect(
    "mongodb://127.0.0.1:27017/db-dugongbookstore",
    { useNewUrlParser: true, useUnifiedTopology: true}
);
mongoose.Promise = global.Promise;
require('./models/emailSchema');
require('./models/bookSchema');
//Routing

const index = require('./routes/index');
const komik = require('./routes/index');
const novel = require('./routes/index');
const promo = require('./routes/promo');
const search = require('./routes/index');
const adminlogin = require('./routes/adminlogin');
const add = require('./routes/add');
const list = require('./routes/list');



app.use('/',index);
app.use('/komik',komik);
app.use('/novel',novel);
app.use('/promo',promo);
app.use('/search',search);
app.use('/add',add);
app.use('/list',list);
app.use('/me7rhg',adminlogin);

//Start node
const port = 3000;
app.listen(port);
console.log(`Running on localhost:${port}`);