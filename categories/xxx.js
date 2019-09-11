const mongoose = require('mongoose');

const xxxSchema = mongoose.Schema({
    channel: String,
    name_channel: String,
    info: String,
    members: Number
});

const xxx_categories = mongoose.model('xxx_categories', xxxSchema);

module.exports = xxx_categories;