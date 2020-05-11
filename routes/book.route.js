var express = require('express');

var router = express.Router();
var controller = require('../controllers/book.controller');

router.get('/', controller.books);

router.get('/createBook', controller.createBook);

router.post('/createBook', controller.postCreateBook);

router.get('/editBook/:bookId', controller.editBook);

router.post('/editBook/:bookId', controller.postEditBook);

router.get('/deleteBook/:bookId', controller.deleteBook);

module.exports = router;