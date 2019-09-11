const mongoose = require('mongoose');

const fashionSchema = mongoose.Schema({
    channel: String,
    name_channel: String,
    info: String,
    members: Number
});

const fashion_categories = mongoose.model('fashion_categories', fashionSchema);

module.exports = fashion_categories;