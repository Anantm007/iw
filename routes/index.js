// File for all the basic home routes

const express =  require('express');
const router = express();

// Blogs model
const Blogs = require('../models/blog.js');


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

// Team page
router.get('/team', async(req,res) =>{
    return res.render("../views/pages/team");
});

module.exports = router;