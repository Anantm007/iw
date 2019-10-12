const express =  require('express');
const router = express();
const mongoose = require('mongoose');
const blogs = require('../models/blog.js');
var multer = require('multer');

var storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, 'public/images/uploads')
    },
    filename: (req, file, cb) => {
      cb(null, file.fieldname + '-' + Date.now())
    }
});
var upload = multer({storage: storage});

router.get('/', async(req,res) => {

    try {
     
         const Blogs = blogs.find();

        res.render('../views/blogs/allblogs', {
        blogs: Blogs
    });   
    } catch (err) {
        res.send(err);
    }

})

module.exports = router;