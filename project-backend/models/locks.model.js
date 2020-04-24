const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ArticleLockSchema = new Schema({
  id: { type: String, required: true, index: { unique: true }},
  username: { type: String, required: true },
  timestamp: {type: String, required:true },
});

const ArticleLock = mongoose.model("ArticleLock", ArticleLockSchema, "article_lock");

module.exports = ArticleLock;