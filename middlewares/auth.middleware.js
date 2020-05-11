var mysql = require('mysql')
var con = require('../mysql-connection')

module.exports.adminAuth = function (req, res, next){
	if(!req.signedCookies.readerId){
		res.redirect('/auth/login');
		return;
	}
	con.query('SELECT * FROM readers WHERE readerId = ?', req.signedCookies.readerId, function (err, result) { 
  		if (err) throw err;
		if (result[0].userId == 1){
			res.redirect('/library')
	}
	res.locals.reader = result[0];
	next()
	});
};
module.exports.readerAuth = function (req, res, next){
	if(!req.signedCookies.readerId){
		res.redirect('/auth/login');
		return;
	}
	con.query('SELECT * FROM readers WHERE readerId = ?', req.signedCookies.readerId, function (err, result) { 
  		if (err) throw err;
		if (result[0].userId == 3){
			res.redirect('/library')
	}
	res.locals.reader = result[0];
	next()
	});
};

module.exports.librarianAuth = function (req, res, next){
	if(!req.signedCookies.readerId){
		res.redirect('/auth/login');
		return;
	}
	con.query('SELECT * FROM readers WHERE readerId = ?', req.signedCookies.readerId, function (err, result) { 
  		if (err) throw err;
		if (result[0].userId == 2){
			res.redirect('/borrowing')
	}
	res.locals.reader = result[0];
	next()
	});
};