var express = require('express');

var router = express.Router();
var controller = require('../controllers/borrowBook.controller');

router.get('/', controller.borrowBooks);


router.get('/returnBook', controller.returnBook);

router.post('/returnBook', controller.postReturnBook);

module.exports = router;