var express = require('express');
var router = express.Router()
var controller = require('../controllers/reader.controller')

router.get('/', controller.index);

router.get('/searchReader', controller.searchReader)

router.get('/viewReader/:readerId', controller.viewReaders);

router.get('/createReader', controller.createReader);

router.post('/createReader', controller.postCreateReader);

router.get('/editReader/:readerId', controller.editReaders);

router.post('/editReader/:readerId' , controller.postEditReaders);

router.get('/deleteReader/:readerId', controller.deleteReaders);

router.get('/addTime/:readerId', controller.addTimes);

router.post('/addTime/:readerId', controller.postAddTimes);

module.exports = router;