// File for CRUD operations on blogs

const express =  require('express');
const router = express();
var bodyParser = require('body-parser')

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


// Get all blogs
router.get('/', async(req,res) => {

  try {
   
       const blogs = await Blogs.find().sort({date: -1});

      res.render('../views/pages/blogs', {
      'Blogs': blogs
  });   
  } catch (err) {
      res.send(err);
  }

});


// Get a specific blog
router.get('/:id', async(req,res) => {

  try {
   
       const blog = await Blogs.find({'_id': req.params.id});
        
      res.render('../views/pages/singleblog', {
        'Blogs': blog
    });   
  } catch (err) {
      res.send(err);
  }

});

// Create new blog posts along with image
router.post('/', upload.single("image"), async(req, res) => {

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

    res.send(blog);

  } catch (err) {
    console.log(err.message);
    res.status(500).send("server error");
  }

});

// Create new comment
router.post('/comment/:id', async(req, res) => {

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

    res.send(blog.comments);

  } catch (err) {
    console.log(err.message);
    res.status(500).send("server error");
  }

});


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