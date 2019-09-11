const mongoose = require('mongoose');

const linguisticsSchema = mongoose.Schema({
    channel: String,
    name_channel: String,
    info: String,
    members: Number
});

const linguistics_categories = mongoose.model('linguistics_categories', linguisticsSchema);

module.exports = linguistics_categories;