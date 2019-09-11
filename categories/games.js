const mongoose = require('mongoose');

const gamesSchema = mongoose.Schema({
    channel: String,
    name_channel: String,
    info: String,
    members: Number
});

const games_categories = mongoose.model('games_categories', gamesSchema);

module.exports = games_categories;