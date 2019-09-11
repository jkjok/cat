const users = require('./message-model');
const Logger = require('./logger');

const MessagesService = {
    getByTitle: function (title, callback) {
        Logger.notify('Called MessagesService.getByTitle with title: ' + title + ' ');

        users.findOne({title1: title}, function (err, message) {
            if (err) {
                callback(err, null);
            }
            else {
                callback(null, message);
            }
        });
    },
};

module.exports = MessagesService;