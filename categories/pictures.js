const mongoose = require('mongoose');

const picturesSchema = mongoose.Schema({
    channel: String,
    name_channel: String,
    info: String,
    members: Number
});

const pictures_categories = mongoose.model('pictures_categories', picturesSchema);

module.exports = pictures_categories;