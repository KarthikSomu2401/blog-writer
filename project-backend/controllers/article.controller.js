const Article = require("../models/article.model");
const User = require("../models/user.model");
const ArticleTags = require("../models/tag.model");
const ArticleLock = require("../models/locks.model");

const bcrypt = require("bcrypt");

exports.getall_articles = function (req, res, next) {
  Article.find()
    .then((article) => res.json(article))
    .catch((err) => res.status(400).json(`Error: ${err}`));
};

exports.get_my_articles = function (req, res, next) {
  User.findOne({ emailId: req.cookies.emailId })
    .populate("profile")
    .then((user) => {
      if (user.profile.interests !== undefined) {
        Article.find({ tags: { $in: user.profile.interests } })
          .sort({ createdAt: "desc" })
          .then((article) => res.json(article))
          .catch((err) => res.status(400).json(`Error: ${err}`));
      } else {
        res.status(404).send();
      }
    });
};

exports.article_add = function (req, res, next) {
  const newArticle = new Article({
    title: req.body.title,
    article: req.body.article,
    authorname: req.body.authorname,
    tags: req.body.tags,
  });
  newArticle
    .save()
    .then(() => res.json("New article posted successfully"))
    .catch((err) => res.status(400).json(`Error : ${err}`));
};

exports.get_article_byId_search = function (req, res, next) {
  Article.findById(req.params.id)
    .then(function (article) {
      res.json(article);
    })
    .catch((err) => res.status(400).json("Fail"));
};

exports.get_article_byId = function (req, res, next) {
  const lockFile = new ArticleLock({
    id: req.params.id,
    username: req.cookies.fullName,
    timestamp: new Date(),
  });

  ArticleLock.findOne({ id: req.params.id })
    .then(function (article_lock) {
      if (!article_lock) {
        console.log(req.cookies.fullName);
        Article.findById(req.params.id)
          .then(function (article) {
            lockFile
              .save()
              .then(() => res.json(article), console.log("lock created"))
              .catch((err) => res.status(400).json(`Error : ${err}`));
          })
          .catch((err) => res.status(400).json(`Error : ${err}`));
      } else {
        res.status(404).json("Failed");
      }
    })

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
      article.tags = req.body.tags;
      //update ==>
      article
        .save()
        .then(() =>
          ArticleLock.findOneAndRemove({ id: req.params.id })
            .then(() => res.json("Lock DELETED"))
            .catch(() => res.status(400).json("Failed"))
        )
        .catch((err) => console.log("Unable to UPDATE"));
    })
    .catch((err) => res.status(400).json(`Error: ${err}`));
};
