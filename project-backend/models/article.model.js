const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ArticleTags = require("./tag.model");

/**
 * @swagger
 * definitions:
 *   User:
 *     properties:
 *       fullName:
 *         type: string
 *       emailId:
 *         type: string
 *       password:
 *         type: string
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
