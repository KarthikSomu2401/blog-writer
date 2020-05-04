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

/**
 * @swagger
 * definitions:
 *   Article:
 *     properties:
 *       title:
 *         type: string
 *       article:
 *         type: string
 *       authorname:
 *         type: string
 *       tags:
 *         type: array
 *         items:
 *            $ref: '#definitions/Tags'
 */

/**
 * @swagger
 * definitions:
 *   Tags:
 *     properties:
 *       label:
 *         type: string
 *       value:
 *         type: string
 */

/**
 * @swagger
 * /article/all:
 *   get:
 *     tags:
 *       - Article
 *     description: Returns all articles
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: An array of all articles
 *         schema:
 *           $ref: '#/definitions/Article'
 */
router
  .route("/all")
  .get(sessionChecker)
  .get(article_controller.getall_articles);

/**
 * @swagger
 * /article/mine:
 *   get:
 *     tags:
 *       - Article
 *     description: Returns all my interested articles
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: An array of all my interested articles
 *         schema:
 *           $ref: '#/definitions/Article'
 */
router
  .route("/mine")
  .get(sessionChecker)
  .get(article_controller.get_my_articles);

/**
 * @swagger
 * /article/add:
 *   post:
 *     tags:
 *       - Article
 *     description: Returns all my interested articles
 *     consumes:
 *       - application/json
 *     parameters:
 *       - name: article
 *         required: true
 *         paramType: body
 *         in: body
 *         schema:
 *           $ref: '#/definitions/Article'
 *     responses:
 *       200:
 *         description: Successfully Updated
 *         schema:
 *           $ref: '#/definitions/Article'
 */
router.route("/add").get(sessionChecker).post(article_controller.article_add);

/**
 * @swagger
 * /article/:id:
 *   get:
 *     tags:
 *       - Article
 *     description: Returns all my interested articles
 *     consumes:
 *       - application/json
 *     parameters:
 *       - name: id
 *         required: true
 *         in: path
 *     responses:
 *       200:
 *         description: An array of all my interested articles
 *         schema:
 *           $ref: '#/definitions/Article'
 */
router
  .route("/:id")
  .get(sessionChecker)
  .get(article_controller.get_article_byId);

/**
 * @swagger
 * /article/search/:id:
 *   get:
 *     tags:
 *       - Article
 *     description: Returns all my interested articles
 *     consumes:
 *       - application/json
 *     parameters:
 *       - name: id
 *         required: true
 *         in: path
 *     responses:
 *       200:
 *         description: An array of all my interested articles
 *         schema:
 *           $ref: '#/definitions/Article'
 */
router
  .route("/search/:id")
  .get(sessionChecker)
  .get(article_controller.get_article_byId_search);

/**
 * @swagger
 * /article/:id:
 *   delete:
 *     tags:
 *       - Article
 *     description: Returns all my interested articles
 *     consumes:
 *       - application/json
 *     parameters:
 *       - name: id
 *         required: true
 *         in: path
 *     responses:
 *       200:
 *         description: An array of all my interested articles
 *         schema:
 *           $ref: '#/definitions/Article'
 */
router
  .route("/:id")
  .get(sessionChecker)
  .delete(article_controller.delete_article_byId);

/**
 * @swagger
 * /article/update/:id:
 *   post:
 *     tags:
 *       - Article
 *     description: Returns all my interested articles
 *     consumes:
 *       - application/json
 *     parameters:
 *       - name: id
 *         required: true
 *         in: path
 *       - name: article
 *         required: true
 *         paramType: body
 *         in: body
 *         schema:
 *           $ref: '#/definitions/Article'
 *     responses:
 *       200:
 *         description: An array of all my interested articles
 *         schema:
 *           $ref: '#/definitions/Article'
 */
router
  .route("/update/:id")
  .get(sessionChecker)
  .post(article_controller.edit_article_byId);

module.exports = router;
