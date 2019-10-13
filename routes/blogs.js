const express =  require('express');
const router = express();
const Blogs = require('../models/blog.js');
var multer = require('multer');

const multerConf = {
  storage: multer.diskStorage({
    destination: function(req, file, next)
    {
      next(null,"./public/images");
    },

    filename: function(req, file, next)
    {
      const ext = file.mimetype.split("/")[1];
      next(null, file.fieldname + '-' + Date.now()+ "." + ext);
    }
  }),

  fileFilter: function(req, file, next)
  {
    if(!file)
    {
      next();
    }

    const image = file.mimetype.startsWith("image/");

    if(image)
    {
      next(null, true);
    }
    else
    {
      next({message: "File type not supported"}, false);
    }
  }
};

var storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, 'public/images')
    },
    filename: (req, file, cb) => {
      cb(null, file.fieldname + '-' + Date.now())
    }
});
var upload = multer({storage: storage});


router.post('/', multer(multerConf).single("photo"), async(req, res) => {

  const {title, body, image} = req.body;

  try {
    
    blog = new Blogs({
      title,
      body, 
      image,
      date
    })

    console.log(blog);

    blog.photo.data = fs.readFileSync(req.file.path);
    blog.photo.contentType = "image/png";

    console.log(product.photo);

// Saving product to the Database
    await product.save();

    res.send(blog);

  } catch (err) {
    console.log(err.message);
    res.status(500).send("server error");
  }

});


module.exports = router;