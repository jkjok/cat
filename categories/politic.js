const mongoose = require('mongoose');

const politicSchema = mongoose.Schema({
    channel: String,
    name_channel: String,
    info: String,
    members: Number
});

const politic_categories = mongoose.model('politic_categories', politicSchema);

module.exports = politic_categories;