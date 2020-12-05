const express = require('express');
const bodyParser = require('body-parser');
const layouts = require('express-ejs-layouts');
//const session = require('express-session'); Not used due no login sesssion needed for user

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

//Session (Not required right now)
/* app.use(session({
    secret: 'some_secret_key',
    cookie: {}
})) */

mongoose.connect(
    "mongodb://127.0.0.1:27017/db-dugongbookstore",
    { useNewUrlParser: true, useUnifiedTopology: true}
);
mongoose.Promise = global.Promise;
require('./models/novelSchema');
require('./models/komikSchema');
//Routing

const index = require('./routes/index');
const komik = require('./routes/komik');
const novel = require('./routes/novel');
const promo = require('./routes/promo');
const search = require('./routes/search');
const add = require('./routes/add');
const addk = require('./routes/addk');
const listn = require('./routes/listn');
const listk = require('./routes/listk');
//Routing v2 : Detail Page, uses lots of resource and energy :(
{
    //Route Komik
    const ki1 = require('./routes/dets/ki1');
    const ki2 = require('./routes/dets/ki2');
    const ki3 = require('./routes/dets/ki3');
    const ki4 = require('./routes/dets/ki4');
    const ki5 = require('./routes/dets/ki5');
    const ki6 = require('./routes/dets/ki6');
    const kl1 = require('./routes/dets/kl1');
    const kl2 = require('./routes/dets/kl2');
    const kl3 = require('./routes/dets/kl3');
    const kl4 = require('./routes/dets/kl4');
    const kl5 = require('./routes/dets/kl5');
    const kl6 = require('./routes/dets/kl6');
    //Route Novel
    const ni1 = require('./routes/dets/ni1');
    const ni2 = require('./routes/dets/ni2');
    const ni3 = require('./routes/dets/ni3');
    const ni4 = require('./routes/dets/ni4');
    const ni5 = require('./routes/dets/ni5');
    const ni6 = require('./routes/dets/ni6');
    const nl1 = require('./routes/dets/nl1');
    const nl2 = require('./routes/dets/nl2');
    const nl3 = require('./routes/dets/nl3');
    const nl4 = require('./routes/dets/nl4');
    const nl5 = require('./routes/dets/nl5');
    const nl6 = require('./routes/dets/nl6');
    //Use routing komik
    app.use('/ki1',ki1);
    app.use('/ki2',ki2);
    app.use('/ki3',ki3);
    app.use('/ki4',ki4);
    app.use('/ki5',ki5);
    app.use('/ki6',ki6);
    app.use('/kl1',kl1);
    app.use('/kl2',kl2);
    app.use('/kl3',kl3);
    app.use('/kl4',kl4);
    app.use('/kl5',kl5);
    app.use('/kl6',kl6);
    //Use routing novel
    app.use('/ni1',ni1);
    app.use('/ni2',ni2);
    app.use('/ni3',ni3);
    app.use('/ni4',ni4);
    app.use('/ni5',ni5);
    app.use('/ni6',ni6);
    app.use('/nl1',nl1);
    app.use('/nl2',nl2);
    app.use('/nl3',nl3);
    app.use('/nl4',nl4);
    app.use('/nl5',nl5);
    app.use('/nl6',nl6);
}

app.use('/',index);
app.use('/komik',komik);
app.use('/novel',novel);
app.use('/promo',promo);
app.use('/search',search);
app.use('/add',add);
app.use('/addk',addk);
app.use('/listn',listn);
app.use('/listk',listk);

//Start node
const port = 3000;
app.listen(port);
console.log(`Running on localhost:${port}`);