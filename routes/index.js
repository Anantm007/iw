const express =  require('express');
const router = express();


// Home page
router.get('/', async(req,res) =>{
    return res.render("../views/pages/home");
});

// Explore Campus page
router.get('/campus', async(req,res) =>{
    return res.render("../views/pages/campus");
});

// Events page
router.get('/events', async(req,res) =>{
    return res.render("../views/pages/events");
});

// College Updates page
router.get('/updates', async(req,res) =>{
    return res.render("../views/pages/updates");
});

// Blog Page
router.get('/blogs', async(req,res) =>{
    return res.render("../views/pages/blogs");
});

// Team page
router.get('/team', async(req,res) =>{
    return res.render("../views/pages/team");
});

module.exports = router;