const express = require('express');

const router = express.Router();

router.get('/',async(req,res)=>{
    //Show to search
    res.render('pages/search');
});

module.exports = router;