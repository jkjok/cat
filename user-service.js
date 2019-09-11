const UserModel = require('./user-model');
const Logger = require('./logger');
const like = require('./like');
const UserService = {
    getAll: function (callback) {
        Logger.notify('Called UserService.getAll ');

        UserModel.find({}, function (err, users) {
            if (err) {
                callback(err, null);
            } else {
                callback(null, users);
            }
        })
    },

    isNew: function (telegramId, callback) {
        Logger.notify('Called UserService.isNew ');

        UserModel.findOne({telegramId: telegramId}, function (err, existingUser) {
            if (err) {
                callback(err, null);
                return;
            }
            if (existingUser) {
                callback(null, false);
            } else {
                callback(null, true);
            }
        });
    },

    saveUser: function (userInfo, callback) {
        Logger.notify('Called UserService.saveUser with id: ' + userInfo.telegramId + ' ');

        this.isNew(userInfo.telegramId, function (err, result) {
            if (err) {
                callback(err, null);
                return;
            }
            if (result) {
                const newUserDto = new UserModel({
                    telegramId: userInfo.telegramId,
                    fistName: userInfo.firstName,
                    userName: userInfo.userName
                });
                like.findById('5c5848083fcd5f1d4492670d' ,function(err, s) {
                    like.updateOne({'number': s.number}, {'number': ++s.number},function(err, doc) {
                    });
                });

                Logger.notify('Trying to save new user ');
                newUserDto.save(function (err) {
                    if (err) {
                        callback(err, null);
                    } else {
                        callback(null, true);
                    }
                });
            }else{
                callback(null, false);
            }
        })
    }
};

module.exports = UserService;