const mongoose = require('mongoose');

const newsSchema = mongoose.Schema({
    channel: String,
    name_channel: String,
    info: String,
    members: Number
});

const news_categories = mongoose.model('news_categories', newsSchema);

module.exports = news_categories;