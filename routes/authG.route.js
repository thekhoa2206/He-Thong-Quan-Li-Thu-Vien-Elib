var express = require('express')
var router = express.Router()
var controller = require('../controllers/authG.controller')

router.get('/loginG', controller.login);
router.post('/loginG',controller.postLogin);

module.exports = router;