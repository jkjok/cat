const userbase = require('./competition');
const Logger = require('./logger');

const TestService = {
    getAll: function (callback) {
        Logger.notify('Called UserService.getAll ');

        userbase.find({}, function (err, users) {
            if (err) {
                callback(err, null);
            } else {
                callback(null, users);
            }
        }).limit(4).sort({number: -1}).join(";");
    }
}
module.exports = TestService;