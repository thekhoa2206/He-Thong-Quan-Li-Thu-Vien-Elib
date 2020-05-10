var express = require('express');
var multer = require('multer');

var router = express.Router();
var controller = require('../controllers/book.controller');

var upload = multer({ dest: './public/uploads/' });

router.get('/', controller.books);

router.get('/createBook', controller.createBook);

router.post('/createBook',upload.single('picture') , controller.postCreateBook);

router.get('/editBook/:bookId', controller.editBook);

router.post('/editBook/:bookId', controller.postEditBook);

router.get('/deleteBook/:bookId', controller.deleteBook);

module.exports = router;