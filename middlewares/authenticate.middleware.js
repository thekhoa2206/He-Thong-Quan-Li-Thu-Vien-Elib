var mysql = require('mysql')
var con = require('../mysql-connection')

module.exports.librarianAuth = function (req, res, next){
	if(!req.session.readerId){
		res.redirect('/auth/login');
		return;
	}
	con.query('SELECT * FROM readers WHERE readerId = ?', req.session.readerId, function (err, result) { 
  		if (err) throw err;
		if (result[0].userId.localeCompare("2")!== 0){
			res.redirect('/library')
	}
	res.locals.reader = result[0];
	next()
	});
};
module.exports.adminAuth = function (req, res, next){
	if(!req.session.readerId){
		res.redirect('/auth/login');
		return;
	}
	con.query('SELECT * FROM readers WHERE readerId = ?', req.session.readerId, function (err, result) { 
  		if (err) throw err;
		if (result[0].userId.localeCompare("1")!== 0){
			res.redirect('/librarians')
	}
	res.locals.reader = result[0];
	next()
	});
};

module.exports.readerAuth = function (req, res, next){
	if(!req.session.readerId){
		res.redirect('/auth/login');
		return;
	}
	con.query('SELECT * FROM readers WHERE readerId = ?', req.session.readerId, function (err, result) { 
  		if (err) throw err;
		if (result[0].userId.localeCompare("3")!== 0){
			res.redirect('/borrowing')
	}
	res.locals.reader = result[0];
	next()
	});
};