const express = require('express');
const router = express.Router();

// Require the controllers WHICH WE DID NOT CREATE YET!!
const user_controller = require('../controllers/user.controller');


// a simple test url to check that all of our files are communicating correctly.
router.post('/createuser', user_controller.create_user);
router.post('/loginuser', user_controller.login_user);
module.exports = router;