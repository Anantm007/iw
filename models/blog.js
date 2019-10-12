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

    photo: {
        data: Buffer,
        contentType: String
    },

    date: {
        type: Date,
        default: Date.now(),
        required: true
    }
});

module.exports = Blog = mongoose.model('blog', BlogSchema);