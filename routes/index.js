// File for all the basic home routes

const express =  require('express');
const router = express();

// Blog model
const Blogs = require('../models/blog');

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


// Get all blogs
router.get('/blogs', async(req,res) => {

    try {
      
         // Fetch all blogs to get total number of blogs
         const blogs = await Blogs.find().sort({date: -1});
  
         // Fetch the latest blog sorted by date
         const latest = await Blogs.findOne({}, {}, {sort: {'date': -1}});
         
         // Fetch all blogs except the latest one
         blogs2 = await Blogs.find().limit(blogs.length-1);
  
        res.render('../views/pages/blogs', {
        'Blogs': blogs2,
        'latest': latest
    });   
    } catch (err) {
        res.send(err);
    }
  
  });
  
  
  // Get a specific blog
  router.get('/blogs/:id', async(req,res) => {
  
    try {
     
         const blog = await Blogs.findOne({'_id': req.params.id});
          
        res.render('../views/pages/singleblog', {
          'Blog': blog
      });   
    } catch (err) {
        res.send(err);
    }
  
  });

  // Create new comment
router.post('/blogs/comment/:id', async(req, res) => {

    const {name, text} = req.body;  
  
    try {
      
      const blog = await Blogs.findOne({'_id':req.params.id});
  
      // Create a new comment object
      const newComment = ({
        name,
        text,
        date: Date.now()
      });
  
  
      blog.comments.unshift(newComment);
  
  
      // Saving blog to the Database
      await blog.save();
      
      res.redirect('/blogs/' + blog.id);
    
    } catch (err) {
      console.log(err.message);
      res.status(500).send("server error");
    }
  
  });
  
  
// Displaying a specific image with blog id passed as a parameter
router.get('/blogs/photo/:id', (req, res) => {
  var filename = req.params.id;
  
  Blogs.findOne({'_id': filename }, (err, result) => {
  
      if (err) return console.log(err)
   
     res.contentType('image/jpeg');
     res.send(result.image.data);     
      
    })
  })


// Team page
router.get('/team', async(req,res) =>{
    return res.render("../views/pages/team");
});

module.exports = router;