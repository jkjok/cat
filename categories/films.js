const mongoose = require('mongoose');

const filmsSchema = mongoose.Schema({
    channel: String,
    name_channel: String,
    info: String,
    members: Number
});

const films_categories = mongoose.model('films_categories', filmsSchema);

module.exports = films_categories;