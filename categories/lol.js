const mongoose = require('mongoose');

const lolSchema = mongoose.Schema({
    channel: String,
    name_channel: String,
    info: String,
    members: Number
});

const lol_categories = mongoose.model('lol_categories', lolSchema);

module.exports = lol_categories;