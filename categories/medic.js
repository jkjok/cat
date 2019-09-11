const mongoose = require('mongoose');

const medicSchema = mongoose.Schema({
    channel: String,
    name_channel: String,
    info: String,
    members: Number
});

const medic_categories = mongoose.model('medic_categories', medicSchema);

module.exports = medic_categories;