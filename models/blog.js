const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const BlogSchema = new Schema ({
    title: {
        type: String,
        required: true
    },

    body: {
        type: String,
        required: true
    },

    image: {
        data: Buffer,
        contentType: String
    },

    comments: [
        {
          name: {
            type: String,
            required: true
          },

          text: {
            type: String,
            required: true
          },
          date: {
            type: Date,
            default: Date.now
          }
        }
      ],

    date: {
        type: Date,
        default: Date.now(),
        
    }
});

module.exports = Blog = mongoose.model('blog', BlogSchema);