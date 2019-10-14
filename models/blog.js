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
        name: String,
        data: Buffer,
        contentType: String
    },

    date: {
        type: Date,
        default: Date.now(),
        
    }
});

module.exports = Blog = mongoose.model('blog', BlogSchema);