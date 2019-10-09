const express =  require('express');
const router = express();


// Home page
router.get('/', async(req,res) =>{
    return res.render("../views/home",{
        'base': req.headers.host
    });
});

// Explore Campus page
router.get('/campus', async(req,res) =>{
    return res.render("../views/campus",{
        'base': req.headers.host
    });
});

// Events page
router.get('/events', async(req,res) =>{
    return res.render("../views/events",{
        'base': req.headers.host
    });
});

// College Updates page
router.get('/updates', async(req,res) =>{
    return res.render("../views/updates",{
        'base': req.headers.host
    });
});

// Blog Page
router.get('/blogs', async(req,res) =>{
    return res.render("../views/blogs",{
        'base': req.headers.host
    });
});

// Team page
router.get('/team', async(req,res) =>{
    return res.render("../views/team",{
        'base': req.headers.host
    });
});

module.exports = router;