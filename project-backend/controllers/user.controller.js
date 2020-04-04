const User = require("../models/user.model");

exports.create_user = function(req, res, next) {
  let user = new User(req.body);

  user.save(function(err) {
    if (err) {
      return next(err);
    }
    res.status(201).send("User Created successfully");
  });
};
