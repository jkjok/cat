const userbase = require('./userbase');
const Logger = require('./logger');

const DeleteService = {
    getAll: function (callback) {
        Logger.notify('Called UserService.getAll ');

        userbase.find({}, function (err, users) {

            if (err) {
                callback(err, null);
            } else {
                callback(null, users);
            }
        })
    }
}
module.exports = DeleteService;