var express = require('express');

var router = express.Router();
var controller = require('../controllers/borrowBook.controller');

router.get('/', controller.borrowBooks);


module.exports = router;