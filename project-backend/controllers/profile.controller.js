const Profile = require("../models/profile.model");
const ArticleTags = require("../models/tag.model");
const User = require("../models/user.model");
const UserLog = require("../models/userlog.model");

exports.display_profile = function (req, res) {
  const errors = {};
  User.findOne({ emailId: req.cookies.emailId }, { password: 0 })
    .populate({ path: "profile" })
    .then((user) => {
      if (!user) {
        errors.noprofile = "There no profile for the user";
        return res.status(404).json(errors);
      }
      res.json(user);
    })
    .catch((err) => res.status(404).json(err));
};

exports.edit_profile = async function (req, res) {

  const user10 = new UserLog({
    emailId: req.cookies.emailId,
    fullName: req.cookies.fullName,
    timestamp: new Date(),
    action: "EDITED PROFILE",
  });
  
  console.log(req.body.profile.interests);
  User.findById(req.params.id)
    .then((user) => {
      var profile = {};
      profile.birthday = req.body.profile.birthday;
      profile.city = req.body.profile.city;
      profile.occupation = req.body.profile.occupation;
      profile.bio = req.body.profile.bio;
      profile.interests = req.body.profile.interests || [];
      //update ==>
      Profile.findByIdAndUpdate(req.body.profile._id, profile, {
        new: true,
      }).then((profileNew) => {
        user.profile = profileNew;
        user.save().then((user) =>

        user10.save()
        .then(() =>res.json(user))
        .catch((err) => res.status(400).json(`Error: ${err}`))

        );
      });
    })
    .catch((err) => res.status(400).json(`Error: ${err}`));
  //});
};
