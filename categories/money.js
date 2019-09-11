const mongoose = require('mongoose');

const moneySchema = mongoose.Schema({
    channel: String,
    name_channel: String,
    info: String,
    members: Number
});

const money_categories = mongoose.model('money_categories', moneySchema);

module.exports = money_categories;