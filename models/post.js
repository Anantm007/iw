const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PostSchema = new Schema ({
    url: {
        type: String,
        required: true
    },

    image: {
        type: String,
        required: true
    },

    likes: {
        type: Number,
        required: true
    },

    comments: {
        type: Number,
        required: true
    },

    text: {
        type: String,
        required: true
    }
}, {timestamps: true} );

module.exports = Post = mongoose.model('Post', PostSchema);