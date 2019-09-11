const mongoose = require('mongoose');

const technologySchema = mongoose.Schema({
    channel: String,
    name_channel: String,
    info: String,
    members: Number
});

const technology_categories = mongoose.model('technology_categories', technologySchema);

module.exports = technology_categories;