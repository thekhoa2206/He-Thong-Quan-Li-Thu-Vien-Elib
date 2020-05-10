var mysql = require('mysql')
var con = require('../mysql-connection')

module.exports.requireAuth = function (req, res, next){
	if(!req.signedCookies.readerId){
		res.redirect('/auth/login');
		return;
	}
	con.query('SELECT * FROM readers WHERE readerId = ?', req.signedCookies.readerId, function (err, result) { 
  		if (err) throw err;
  		if(!result[0]){
  			res.redirect('/auth/login');
  		}
  		res.locals.reader = result[0];
  		next()
	});
};
module.exports.adminAuth = function (req, res, next){
	if(!req.signedCookies.readerId){
		res.redirect('/auth/login');
		return;
	}
	con.query('SELECT * FROM readers WHERE readerId = ?', req.signedCookies.readerId, function (err, result) { 
  		if (err) throw err;
		if (result[0].readerId.localeCompare("11111111")!== 0){
			res.redirect('')
	}
	res.locals.reader = result[0];
	next()
	});
};