// File for home admin routes i.e. for centralising vrious other files in the admin folder of route 

const express = require('express');
const router  = express();

// Express session
const session = require('express-session');
router.use(session({secret: 'mysecret',saveUninitialized: true,resave: true}));
var sess;

// Body Parser
var bodyParser = require('body-parser')
// parse application/x-www-form-urlencoded
router.use(bodyParser.urlencoded({ extended: false }))
// parse application/json
router.use(bodyParser.json())

// MongoDB models
const Blogs = require('../../models/blog');
const Query = require('../../models/query');

// Config folder
require('dotenv').config()
const user = process.env.adminusername
const pass = process.env.adminpassword

// Login page of the admin
router.get('/', async(req, res) => {
    sess = req.session;
    if(sess.email)
    {
        res.redirect('/admin/dashboard');
    }

    else
    {
        res.redirect('/admin/login');
    }
});

router.get('/login', async(req, res) => {
    sess = req.session;
    if(sess.email)
    {
        res.redirect('/admin/dashboard');
    }

    else
    {
        res.render('../views/pagesadmin/login');
    }
})

// Logging in the admin
router.post('/login', async(req, res) => {
    
    const {username, password} = req.body;

    try { 
    // Matching credentials
    if(username !== user || password !== pass)
    {   
        res.redirect('/admin');
    }
    
    else
    {
        sess = req.session;
        sess.email = username;

        res.redirect('/admin/dashboard');  
    }

    } catch (err) {
        throw(err);
    }
});

// Admin dashboard
router.get('/dashboard', async(req, res) => {
    sess = req.session;
    if(sess.email)
    {
        return res.render('../views/pagesadmin/dashboard');
    }

    else
    res.redirect('/admin');
})

// Destroying the seesion after logging out the admin
router.get('/logout',(req,res) => {
    req.session.destroy((err) => {
        if(err) {
            return console.log(err);
        }
        res.redirect('/admin');
    });

});


module.exports = router;