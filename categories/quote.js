const mongoose = require('mongoose');

const quoteSchema = mongoose.Schema({
    channel: String,
    name_channel: String,
    info: String,
    members: Number
});

const quote_categories = mongoose.model('quote_categories', quoteSchema);

module.exports = quote_categories;