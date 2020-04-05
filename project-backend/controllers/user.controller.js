const User = require("../models/user.model");
const bcrypt = require("bcrypt");

exports.create_user = function (req, res, next) {
  let user = new User(req.body);
  user.save(function (err) {
    if (err) {
      return next(err);
    }
    res.status(201).send("User Created successfully");
  });
};

exports.login_user = function (req, res, next) {
  User.findOne({
    emailId: req.body.emailId,
  }).then(function (user) {
    if (!user) {
      res.status(404).send("User details not found");
    } else {
      bcrypt.compare(req.body.password, user.password, function (err, result) {
        if (result == true) {
          req.session.user = {
            email: user.emailId,
            name: user.fullName,
          };
          res.status(200).send("User details found");
        } else {
          res.status(401).send("Password mismatch");
        }
      });
    }
  });

  /*   user.findOne(function (err) {
    if (err) {
      return next(err);
    }
    res.status(201).send("User Created successfully");
  }); */
};
