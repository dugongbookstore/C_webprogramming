const express = require('express');

const router = express.Router();

router.get('/',async(req,res)=>{
    //Show to main menu
    res.render('pages/index');
});

module.exports = router;