const express = require('express');

const router = express.Router();

router.get('/',async(req,res)=>{
    //Show to promo
    res.render('pages/promo');
});

module.exports = router;