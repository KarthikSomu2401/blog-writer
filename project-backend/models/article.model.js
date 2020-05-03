const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ArticleTags = require("./tag.model");

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
 *         type: object
 */
const ArticleSchema = new Schema({
  title: { type: String, required: true },
  article: { type: String, required: true },
  authorname: { type: String, required: true },
  //tags: [{ type: Schema.Types.ObjectId, ref: "ArticleTags" }],
  tags: [],
});

const Article = mongoose.model("Article", ArticleSchema, "articles");

module.exports = Article;
