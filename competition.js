const mongoose = require('mongoose');

const competitionSchema = mongoose.Schema({
    name: String,
    number: Number

});

const competition = mongoose.model('competition', competitionSchema);

module.exports = competition;