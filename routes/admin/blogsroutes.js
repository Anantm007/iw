// File for CRUD operations on blogs

const express =  require('express');
const router = express();
var bodyParser = require('body-parser')
var sess;

// parse application/x-www-form-urlencoded
router.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
router.use(bodyParser.json())

// Blog model
const Blogs = require('../../models/blog.js');

// multer and fs for file upload
var multer = require('multer');
const fs = require('fs');

// Set multer storage
var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'upload/images')
  },
  filename: function (req, file, cb) {
    cb(null, file.fieldname + '-' + Date.now())
  }
})
 
var upload = multer({ storage: storage });


// Create new blog posts along with image
router.post('/compose', upload.single("image"), async(req, res) => {

  sess = req.session;

  if(sess.email)
  {
    const {title, body} = req.body;
  
    var img = fs.readFileSync(req.file.path);
    var encode_image = img.toString('base64');
    
    // Define a JSONobject for the image attributes for saving to database
    var finalImg = {
          contentType: req.file.mimetype,
          data:  new Buffer.from(encode_image,'base64')
      };
  
    try {
      
      // Create a new blog object
      blog = new Blogs({
        title,
        body, 
        image: finalImg,
        date: Date.now()
      })
  
      // Saving blog to the Database
      await blog.save();
    
      res.render('../views/pages/singleblog', {
        'Blog': blog
    });
  
    } catch (err) {
      console.log(err.message);
      res.status(500).send("server error");
    }
  
  }

  else
  res.redirect('/admin');
});

// Get all blogs
router.get('/', async(req,res) => {

  sess = req.session;
  if(sess.email)
  {
    try {
      const blogs = await Blogs.find().sort({date: -1});

      res.render('../views/pagesadmin/blogs', {
      'Blogs': blogs
   });   
    } catch (err) {
      res.send(err);
    }
  }

  else
  res.redirect('/admin');
});

// Display blog to be edited
router.get('/edit/:id', async(req, res) => {
  //sess = req.session;

  //if(sess.email) {
    try {
      const blog = await Blogs.findById(req.params.id);
      console.log(blog)

      res.render('../views/pagesadmin/editblog', {
        'Blog': blog
      });
    } catch (err) {
      throw(err);
    }
  //}

  //else
  res.redirect('/admin');
})

// Edit A Blog
router.post('/edit/:id', async(req, res) => {
  //sess = req.session;

  //if(sess.email) {
    console.log(req.body);
    const blog = await Blogs.findByIdAndUpdate({'_id': req.params.id});

    res.redirect('/admin/blogs')
  //}

  //else
  res.redirect('/admin');
})


// Delete A Blog, the method is GET to make requests from frontend
router.get('/delete/:id', async(req, res) => {
  sess = req.session;

  if(sess.email)
  {
    const blog = await Blogs.findOneAndDelete({'_id': req.params.id});

    res.redirect('/admin/blogs')
  }

  else
  res.redirect('/admin');
})



// Displaying a specific image with blog id passed as a parameter
router.get('/photo/:id', (req, res) => {
  var filename = req.params.id;
  
  Blogs.findOne({'_id': filename }, (err, result) => {
  
      if (err) return console.log(err)
   
     res.contentType('image/jpeg');
     res.send(result.image.data);     
      
    })
  })

module.exports = router;