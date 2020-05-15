var express = require('express');

var router = express.Router();
var controller = require('../controllers/book.controller');

router.get('/', controller.books);

router.get('/searchBook', controller.searchBook);

router.get('/createBook', controller.createBook);

router.post('/createBook', controller.postCreateBook);

router.get('/editBook/:bookId', controller.editBook);

router.post('/editBook/:bookId', controller.postEditBook);

router.get('/deleteBook/:bookId', controller.deleteBook);

router.get('/returnBook', controller.returnBook);

router.post('/returnBook', controller.postReturnBook);

router.get('/viewReturnBook', controller.returnBooks)

module.exports = router;