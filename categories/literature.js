const mongoose = require('mongoose');

const literatureSchema = mongoose.Schema({
    channel: String,
    name_channel: String,
    info: String,
    members: Number
});

const literature_categories = mongoose.model('literature_categories', literatureSchema);

module.exports = literature_categories;