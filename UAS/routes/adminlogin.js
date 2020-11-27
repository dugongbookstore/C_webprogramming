const express = require('express');

const router = express.Router();

router.get('/',async(req,res)=>{
    //Show to adminlogin
    res.render('pages/adminlogin');
});

module.exports = router;