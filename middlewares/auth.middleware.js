var mysql = require('mysql')
var con = require('../mysql-connection')

module.exports.readerAuth = function (req, res, next){
	if(!req.session.readerId){
		res.redirect('/auth/login');
		return;
	}
	con.query('SELECT * FROM readers WHERE readerId = ?', req.session.readerId, function (err, result) { 
  		if (err) throw err;
  		if(!result[0]){
  			res.redirect('/auth/login');
  		}
  		res.locals.reader = result[0];
  		next()
	});
};
