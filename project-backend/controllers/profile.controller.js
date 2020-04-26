const Profile = require("../models/profile.model");
const moongoose = require('mongoose');
const bcrypt = require("bcrypt");

const User = require("../models/user.model");
//const Profile = require("../models/profile.model");


//exports.test = function (req, res) {
  // res.json('Works')
 // };

  exports.display_profile = function(req,res)  {
     const errors = {};
   Profile.findOne({ emailId: req.user.emailId})
   .then(Profile => {
      if(!Profile){
      errors.noprofile = 'There no profile for the user';
      return res.status(404).json(errors);
      }
      res.json(profile);
   })
   .catch(err => res.status(404).json(err));
  };

  exports.edit_profile = function(req,res)  {
  //Get fields
  const profileFields = {};
  //profileFields.user = req.user.emailId;
  //if(req.body.handle) profileFields.handle = req.body.handle;
  if(req.body.birthday) profileFields.birthday = req.body.birthday;
  if(req.body.city) profileFields.city = req.body.city;
  if(req.body.occupation) profileFields.occupation = req.body.occupation;
  if(req.body.interests) profileFields.interests = req.body.interests;
  if(req.body.bio) profileFields.bio = req.body.bio;

  Profile.findOne({user: req.user.emailId})
  .then(profile => {
     if(profile){
        //update
        Profile.findByIdAndUpdate({ user: user.req.emailId }, { $set: profileFields }, {new : true})
      .then(profile => res.json(profile));
      }else{
         //create
         new Profile(profileFields).save().then(profile => res.json(profile));
    
      }
  });


};