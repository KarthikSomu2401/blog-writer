const User = require('../models/user.model');

//Simple version, without validation or sanitation
exports.test = function (req, res) {
    res.send('Greetings from the Test controller!');
};

exports.create_user = function (req, res) {
    let user = new User(req.body);

    user.save(function (err) {
        if (err) {
            return next(err);
        }
        res.send('User Created successfully');
    })
};