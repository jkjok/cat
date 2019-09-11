const mongoose = require('mongoose');

const userbaseSchema = mongoose.Schema({
    id_user: String,
    nameChannel: String

});

const userbase = mongoose.model('userbase', userbaseSchema);

module.exports = userbase;