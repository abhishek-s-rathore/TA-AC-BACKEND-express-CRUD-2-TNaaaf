var express = require('express');
var router = express.Router();
var multer = require('multer');
var path = require('path');

var Book = require('../models/book');

// Disk Storage
// var storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, path.join(__dirname, 'public/uploads'));
//   },
//   filename: (req, res, cb) => {
//     cb(null, Date.now() + '-' + file.originalname);
//   },
// });

// var upload = multer({ storage: storage });
// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, 'uploads');
//   },
//   filename: function (req, file, cb) {
//     cb(
//       null,
//       file.fieldname + '-' + Date.now() + path.extname(file.originalname)
//     );
//   },
// });

const upload = multer({
  dest: '../public/uploads/',
});

// Routes
router.get('/', (req, res, next) => {
  Book.find({}, (err, books) => {
    if (err) return next(err);
    res.render('books', { books: books });
  });
});

router.get('/new', (req, res, next) => {
  res.render('newBook');
});

router.post('/', upload.single('cover'), (req, res, next) => {
  var data = req.body;
  Book.create(data, (err, book) => {
    // if (err) return next(err);
    console.log(req.file, req.body);
    res.redirect('/books');
  });
});

router.get('/:bookId', (req, res, next) => {
  var bookId = req.params.bookId;
  Book.findById(bookId, (err, book) => {
    if (err) return next(err);
    res.render('bookDetails', { book });
  });
});

router.get('/:bookId/edit', (req, res, next) => {
  var bookId = req.params.bookId;
  Book.findById(bookId, (err, book) => {
    if (err) return next(err);
    res.render('editBook', { book });
  });
});

router.post('/:bookId', (req, res, next) => {
  var bookId = req.params.bookId;
  var data = req.body;
  Book.findByIdAndUpdate(bookId, data, (err, book) => {
    if (err) return next(err);
    res.redirect('/books/' + bookId);
  });
});

router.get('/:bookId/delete', (req, res, next) => {
  var bookId = req.params.bookId;
  Book.findByIdAndDelete(bookId, (err, book) => {
    if (err) return next(err);
    res.redirect('/books');
  });
});

module.exports = router;
