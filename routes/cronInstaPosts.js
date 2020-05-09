const Post = require('../models/post');
const request = require("request");

// function to fetch insta posts everyday
module.exports = instaPosts = async() => {    
  
  // Empty the DB before adding more
  await Post.deleteMany();
  
  request(`http://adityarajput.me/ig/username/?username=prakriti_msit`, { json: true }, async(err,response, body) => {
    var n = response.body.post.length;

    try { 
      for(var i = 0; i < n; i++)
      {
        var post = new Post({
          url:response.body.post[i].url,
          image:response.body.post[i].image,
          likes:response.body.post[i].likes,
          comments:response.body.post[i].comments,
          text:response.body.post[i].text
        })

        await post.save();
      } 
    } catch (err) {
      throw err;
    }
    console.log("added to DB");
    return;
  });

}