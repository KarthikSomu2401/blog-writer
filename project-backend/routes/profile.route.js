const express = require("express");
const router = express.Router();
// Require the controllers WHICH WE DID NOT CREATE YET!!
const profile_controller = require("../controllers/profile.controller");

var sessionChecker = (req, res, next) => {
    if (!req.cookies.emailId) {
      res.status(404).redirect("/sign-in");
    }
    next();
  };

router.get("/displayprofile", profile_controller.display_profile);
router.post("/editprofile", profile_controller.edit_profile);
//router.get("/test", profile_controller.test);
module.exports = router;
