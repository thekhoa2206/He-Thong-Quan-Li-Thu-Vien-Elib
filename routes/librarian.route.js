var express = require('express');
var router = express.Router()
var controller = require('../controllers/librarian.controller')

router.get('/', controller.index);

router.get('/createLibrarian', controller.createLibrarian);

router.post('/createLibrarian', controller.postCreateLibrarian);

router.get('/editLibrarian/:readerId', controller.editLibrarian);

router.post('/editLibrarian/:readerId', controller.postEditLibrarian);

router.get('/deleteLibrarian/:readerId', controller.deleteLibrarian)
module.exports = router;