var mysql = require('mysql')
var con = require('../mysql-connection')
var md5 = require('md5')


module.exports.login = function (req, res, next) {
	res.render('auth/login');
};
module.exports.postLogin = function (req, res, next) {
	var readerId = req.body.readerId;
	var password = req.body.password;
	con.query('SELECT * FROM readers WHERE readerId = ?',[readerId], function (err, result) { //result trả về 1 array chứa object
		//console.log(typeof result[0].username)
		if (err) throw err;
		if(result[0] === undefined || result[0].readerId !== readerId) {
			res.render('auth/login', {
				errors:[
					'User does not exists'
				],
				values: req.body
			});
			return;
		}

		var hashedPassword = md5(password)

		if(result[0].password !== hashedPassword){
			res.render('auth/login', {
				errors:[
					'Wrong password!'
				],
				values: req.body
			});
			return;
		}
		res.cookie('readerId', result[0].readerId, {
			signed: true
		})
		if (result[0].userId == 1){
			res.redirect('/library');
		}
		if (result[0].userId == 2){
			res.redirect('/library');
		}
		if (result[0].userId == 3){
			res.redirect('/borrowing');
		}
		

});
};