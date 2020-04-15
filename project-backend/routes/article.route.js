const express = require("express");
const router = express.Router();
// Require the controllers WHICH WE DID NOT CREATE YET!!
const article_controller = require("../controllers/article.controller");

var sessionChecker = (req, res, next) => {
  if (!req.cookies.emailId) {
    res.status(404).redirect("/sign-in");
  }
  next();
};

router
  .route("/all")
  .get(sessionChecker)
  .get(article_controller.getall_articles);

router.route("/add").get(sessionChecker).post(article_controller.article_add);

router
  .route("/:id")
  .get(sessionChecker)
  .get(article_controller.get_article_byId);

router
  .route("/:id")
  .get(sessionChecker)
  .delete(article_controller.delete_article_byId);

router
  .route("/update/:id")
  .get(sessionChecker)
  .post(article_controller.edit_article_byId);

module.exports = router;
