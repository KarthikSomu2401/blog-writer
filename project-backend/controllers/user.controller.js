const User = require("../models/user.model");
const UserLog = require("../models/userlog.model");
const Profile = require("../models/profile.model");

const bcrypt = require("bcrypt");

exports.create_user = function (req, res, next) {
  let profile = new Profile({ fullName: req.body.fullName });
  profile
    .save()
    .then((response) => {
      let user = new User({
        emailId: req.body.emailId,
        password: req.body.password,
        profile: response,
      });
      user.save(function (err) {
        if (err) {
          return next(err);
        }
        res.status(201).send("User Created successfully");
      });
    })
    .catch((error) => {
      return next(error);
    });
};

exports.login_user = function (req, res, next) {
  User.findOne({
    emailId: req.body.emailId,
  })
    .populate({ path: "profile" })
    .then(function (user) {
      if (!user) {
        res.status(404).send("User details not found");
      } else {
        bcrypt.compare(req.body.password, user.password, function (
          err,
          result
        ) {
          if (result == true) {
            req.session.user = {
              email: user.emailId,
              name: user.profile.fullName,
            };

            //userlog code
            const user1 = new UserLog({
              emailId: req.session.user.email,
              fullName: req.session.user.name,
              timestamp: new Date(),
              action: "Logged_IN",
            });
            user1
              .save()
              .then(() => console.log("logged in"))
              .catch((err) => console.log("logging failed  "));
            res.status(200).send(req.session.user);
          } else {
            res.status(401).send("Password mismatch");
          }
        });
      }
    });
};

exports.logout_user = function (req, res, next) {
  const user2 = new UserLog({
    emailId: req.cookies.emailId,
    fullName: req.cookies.fullName,
    timestamp: new Date(),
    action: "Logged_OUT",
  });

  console.log(req.cookies.emailId);
  console.log(req.cookies.fullName);

  user2
    .save()
    .then(() => console.log("logged out"))
    .catch((err) => console.log("logging failed  "));

  delete req.session.user;
  delete req.cookies;
  res.status(200);
};
