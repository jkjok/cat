const mongoose = require('mongoose');

const emigrantSchema = mongoose.Schema({
    channel: String,
    name_channel: String,
    info: String,
    members: Number
});

const emigrant_categories = mongoose.model('emigrant_categories', emigrantSchema);

module.exports = emigrant_categories;