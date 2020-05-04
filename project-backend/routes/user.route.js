const express = require("express");
const router = express.Router();

// Require the controllers WHICH WE DID NOT CREATE YET!!
const user_controller = require("../controllers/user.controller");

var sessionChecker = (req, res, next) => {
  if (!req.cookies.emailId) {
    res.status(404).redirect("/sign-in");
  }
  next();
};

/**
 * @swagger
 * /users/createuser:
 *   post:
 *     tags:
 *       - Auth
 *     description: Create User
 *     consumes:
 *       - application/json
 *     parameters:
 *       - name: user
 *         required: true
 *         paramType: body
 *         in: body
 *         schema:
 *           $ref: '#/definitions/User'
 *     responses:
 *       200:
 *         description: User Created Successfully
 */
router.post("/createuser", user_controller.create_user);

/**
 * @swagger
 * /users/login:
 *   post:
 *     tags:
 *       - Auth
 *     description: Login User
 *     consumes:
 *       - application/json
 *     parameters:
 *       - name: user
 *         required: true
 *         paramType: body
 *         in: body
 *         schema:
 *           $ref: '#/definitions/User'
 *     responses:
 *       200:
 *         description: User LoggedIn Successfully
 */
router.post("/loginuser", user_controller.login_user);

/**
 * @swagger
 * /users/logoutuser:
 *   get:
 *     tags:
 *       - Auth
 *     description: Logout User
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: User Loggedout Successfully
 */
router
  .route("/logoutuser")
  .get(sessionChecker)
  .get(user_controller.logout_user);

module.exports = router;
