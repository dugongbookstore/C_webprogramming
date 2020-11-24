const express = require('express');

const router = express.Router();

router.get('/',async(req,res)=>{
    //Show current comic/novel (This comment is copy-pasted, because lots of pages :/)
    //Just change the xxx in 'pages/xxx' into the appropriate pages.
    res.render('pages/dets/ki6');
});

module.exports = router;