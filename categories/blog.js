const mongoose = require('mongoose');

const blogSchema = mongoose.Schema({
    channel: String,
    name_channel: String,
    info: String,
    members: Number
});

const blog_categories = mongoose.model('blog_categories', blogSchema);

module.exports = blog_categories;