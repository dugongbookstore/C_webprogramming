const express = require('express');

const router = express.Router();

router.get('/',async(req,res)=>{
    //Show to novel
    res.render('pages/novel');
});

module.exports = router;