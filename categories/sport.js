const mongoose = require('mongoose');

const sportSchema = mongoose.Schema({
    channel: String,
    name_channel: String,
    info: String,
    members: Number
});

const sport_categories = mongoose.model('sport_categories', sportSchema);

module.exports = sport_categories;