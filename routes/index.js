const express =  require('express');
const router = express();


// Home page
router.get('/', async(req,res) =>{
    return res.render("../views/home",{
        'base': req.headers.host
    });
});

module.exports = router;