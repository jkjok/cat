const mongoose = require('mongoose');

const musicSchema = mongoose.Schema({
    channel: String,
    name_channel: String,
    info: String,
    members: Number
});

const music_categories = mongoose.model('music_categories', musicSchema);

module.exports = music_categories;