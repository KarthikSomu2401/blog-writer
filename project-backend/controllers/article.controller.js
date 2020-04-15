const Article = require("../models/article.model");
const bcrypt = require("bcrypt");

exports.getall_articles = function (req, res, next) {
  Article.find()
    .then((article) => res.json(article))
    .catch((err) => res.status(400).json(`Error: ${err}`));
};

exports.article_add = function (req, res, next) {
  const newArticle = new Article({
    title: req.body.title,
    article: req.body.article,
    authorname: req.body.authorname,
  });
  //saving to mongodb
  newArticle
    .save()
    .then(() => res.json("New article posted successfully"))
    .catch((err) => res.status(400).json(`Error : ${err}`));
};

exports.get_article_byId = function (req, res, next) {
  Article.findById(req.params.id)
    .then((article) => res.json(article))
    .catch((err) => res.status(400).json(`Error : ${err}`));
};

exports.delete_article_byId = function (req, res, next) {
  Article.findByIdAndDelete(req.params.id)
    .then(() => res.json("Article is deleted"))
    .catch((err) => res.status(400).json(`Error: ${err}`));
};

exports.edit_article_byId = function (req, res, next) {
  Article.findById(req.params.id)
    .then((article) => {
      article.title = req.body.title;
      article.article = req.body.article;
      article.authorname = req.body.authorname;
      //update ==>
      article
        .save()
        .then(() => res.json("Article UPDATED successfully!"))
        .catch((err) => res.status(400).json(`Error: ${err}`));
    })
    .catch((err) => res.status(400).json(`Error: ${err}`));
};
