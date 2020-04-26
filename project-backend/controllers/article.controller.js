const Article = require("../models/article.model");
const ArticleTags = require("../models/tag.model");
const ArticleLock = require("../models/locks.model");
const UserLog = require("../models/userlog.model");


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
    tags: req.body.tags,
  });
  /* var tags = req.body.tags;
  tags.map((tag) => {
    ArticleTags.findOne(tag).then((result) => {
      if (result === undefined || result === null) {
        var tagValue = new ArticleTags(tag);
        var tagsave = tagValue.save();
        newArticle.markModified("tags");
        newArticle.tags.push(tagsave);
      }
    });
  }); */
  //saving to mongodb
/*  const user1 = new UserLog({
    emailId: req.session.user.email,
    fullName: req.session.user.name,
    timestamp: new Date(),
    action: "Added Article",

  });*/


  const user6 = new UserLog({

    fullName: req.body.authorname,
    timestamp: new Date(),
    action: "ARTICLE ADDITION",
    articleTitle: req.body.title,


  });

  newArticle
    .save()
    .then(() => user6.save()
    .then(() =>  res.json("New article posted successfully"))
  .catch((err) => res.status(400).json(`Error : ${err}`)))
    .catch((err) => res.status(400).json(`Error : ${err}`));
};

/*
User.findOne({
  emailId: req.body.emailId,
}).then(function (user) {
  if (!user) {
    res.status(404).send("User details not found");
  } else {
    bcrypt.compare(req.body.password, user.password, function (err, result) {
      if (result == true) {
        req.session.user = {
          email: user.emailId,
          name: user.fullName,
        };
*/
exports.get_article_byId = function (req, res, next) {
  //This is the original code
  /*  Article.findById(req.params.id)
    .then((article) => res.json(article))
    .catch((err) => res.status(400).json(`Error : ${err}`));*/
  const lockFile = new ArticleLock({
    id: req.params.id,
    emailId: req.cookies.emailId,
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
              .then(() => res.json(article))
              .catch((err) => res.status(400).json(`Error: ${err}`));

          })
          .catch((err) => res.status(400).json("Fail"));
      } else {
        res.status(404).json("Failed");
      }
    })

    .catch((err) => res.status(400).json(`Error : ${err}`));
  /*ArticleLock.findById(req.params.id)
    .then((article) => res.status(400).json("Article is in USE")
    .catch(()=> Article.findById(req.params.id)
      .then((article) => res.json(article),

      lockFile
      .save()
      .then(()=> console.log("Lock Created"))
      .catch(() => console.log("Lock Not Created")))
        )
          .catch((err) => res.status(400).json(`Error : ${err}`)))
    .catch((err) => res.status(400).json(`Error : ${err}`))*/
};

exports.delete_article_byId = function (req, res, next) {

  const user7 = new UserLog({

    timestamp: new Date(),
    action: "ARTICLE DELETION",
    articleId: req.params.id,



  });




  Article.findByIdAndDelete(req.params.id)
    .then(() =>
     user7.save()
     .then(() => res.json("Article is deleted"))
   .catch((err) => res.status(400).json(`Error: ${err}`)))
    .catch((err) => res.status(400).json(`Error: ${err}`));
};

exports.edit_article_byId = function (req, res, next) {
  /* var finalTags = [];
  var tags = req.body.tags;
  tags.map((tag) => {
    ArticleTags.findOne(tag).then((result) => {
      if (result === undefined) {
        finalTags.push(tag);
      }
    });
  });
  var finArticleTags = new ArticleTags(finalTags);
  let tagsId = finArticleTags.save(); */
  const user5 = new UserLog({

    fullName: req.body.authorname,
    timestamp: new Date(),
    action: "ARTICLE UPDATION",
    articleId: req.params.id,
    articleTitle: req.body.title,

  });


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
            .then(() =>  user5
            .save()
            .then(() =>  res.json("Lock DELETED and Log Updated"))
            .catch(() => console.log("Failed 1")))
            .catch(() => console.log("Failed 2"))
        )
        .catch((err) => res.status(400).json(`Error: ${err}`));
    })
    .catch((err) => res.status(400).json(`Error: ${err}`));
};
