const Profile = require("../models/profile.model");
const ArticleTags = require("../models/tag.model");
const moongoose = require('mongoose');
const bcrypt = require("bcrypt");

const User = require("../models/user.model");
//const Profile = require("../models/profile.model");


//exports.test = function (req, res) {
// res.json('Works')
// };

exports.display_profile = function (req, res) {
   const errors = {};
   Profile.findOne({ email: req.cookies.emailId })
      .then(Profile => {
         if (!Profile) {
            errors.noprofile = 'There no profile for the user';
            return res.status(404).json(errors);
         }
         res.json(Profile);
      })
      .catch(err => res.status(404).json(err));
};

exports.edit_profile = function (req, res) {
   //Get fields
   const profileFields = {};
   //profileFields.user = req.user.emailId;
   //if(req.body.handle) profileFields.handle = req.body.handle;
  /*  if (req.body.birthday) profileFields.birthday = req.body.birthday;
   if (req.body.city) profileFields.city = req.body.city;
   if (req.body.occupation) profileFields.occupation = req.body.occupation;
   if (req.body.interests) profileFields.interests = req.body.interests;
   if (req.body.bio) profileFields.bio = req.body.bio; */
console.log(req.file);
   /* Profile.findById(req.params.id)
   .then(profile => {
      if(profile){
         //update
         Profile.findOneAndUpdate({ email: req.cookies.emailId }, { $set: {profileFields }}, {new : true})
       .save().then(profile => res.json(profile));
 
       }else{
          //create
          new Profile(profileFields).save().then(profile => res.json(profile));
     
       }
   }); */
   Profile.findById(req.params.id)
      .then((profile) => {
         profile.birthday = req.body.birthday;
         profile.city = req.body.city;
         profile.occupation = req.body.occupation;
         //profile.interest = req.body.interest;
         profile.bio = req.body.bio;
         //profile.image = req.file.path;
         profile.tags = req.body.tags;
         //update ==>
         profile
            .save().then(profile => res.json(profile));
      })
      .catch((err) => res.status(400).json(`Error: ${err}`));




};