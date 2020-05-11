var express = require('express');
var router = express.Router();
var controller = require('../controllers/borrowReaderBook.controller');

router.get('/', controller.books);

router.get('/searchBook', controller.searchBooks);

router.get('/borrowBook', controller.borrowBook);

router.post('/borrowBook', controller.postBorrowBook);

router.get('/viewReader', controller.viewReader);

module.exports = router;