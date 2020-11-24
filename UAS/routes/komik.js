const express = require('express');

const router = express.Router();

router.get('/',async(req,res)=>{
    //Show to komik page
    res.render('pages/komik');
});

module.exports = router;