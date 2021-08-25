var express = require('express');
var router = express.Router();

var Article = require('../models/article');

router.get('/', (req, res, next) => {
  Article.find({}, (err, articles) => {
    if (err) return next(err);
    res.render('blogs', { articles });
  });
});

router.get('/new', (req, res) => {
  res.render('newBlog');
});

router.post('/', (req, res, next) => {
  var data = req.body;
  data.tags = data.tags.trim().split(' ');
  Article.create(data, (err, createdArticle) => {
    if (err) return next(err);
    res.redirect('/articles');
  });
});

router.get('/:id', (req, res) => {
  var id = req.params.id;
  Article.findById(id, (err, article) => {
    if (err) return next(err);
    res.render('singleBlog', { article });
  });
});

router.get('/:id/edit', (req, res) => {
  var id = req.params.id;

  Article.findById(id, (err, article) => {
    if (err) return next(err);
    res.render('editBlog', { article });
  });
});

router.post('/:id', (req, res) => {
  var id = req.params.id;
  var data = req.body;
  data.tags = data.tags.trim().split(' ');
  Article.findByIdAndUpdate(id, data, (err, updatedArticle) => {
    if (err) return next(err);
    res.redirect('/articles/' + id);
  });
});

router.get('/:id/delete', (req, res) => {
  var id = req.params.id;

  Article.findByIdAndDelete(id, (err, deletedArticle) => {
    if (err) return next(err);
    res.redirect('/articles');
  });
});

module.exports = router;
