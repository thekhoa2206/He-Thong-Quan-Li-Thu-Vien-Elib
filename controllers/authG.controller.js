var mysql = require('mysql');
var con = require('../mysql-connection')
var md5 = require('md5')
const shortid = require('shortid')
module.exports.login = function (req, res, next) {
	res.render('auth/loginG');
};

module.exports.postLogin = function (req, res, next) {
	var readerId = req.body.readerId;
	var password = req.body.password;

	var now = new Date();
	con.query('SELECT * FROM readers WHERE readerId = ?',[readerId], function (err, result) { //result trả về 1 array chứa object
		//console.log(typeof result[0].username)
     req.session.readerId = result[0].readerId;
		if (err) throw err;
		if(result[0] === undefined || result[0].readerId !== readerId) {
			res.render('auth/login', {
				errors:[
					'ID does not exists'
				],
				values: req.body
			});
			return;
		}

		var hashedPassword = md5(password)

		if(result[0].password !== hashedPassword){
			res.render('auth/loginG', {
				errors:[
					'Wrong password!'
				],
				values: req.body
			});
			return;
		}
		if(result[0].password == hashedPassword && result[0].readerId == readerId ){
	    var idtime = shortid.generate();
         var values = [
		idtime,
		req.session.readerId,
		now,
        ]
        console.log(values)
        con.query('INSERT INTO time (idtime, readerId, timeIn) VALUES (?)',[values], function(err, result){
        if(err) throw err;
        })
			res.render('auth/loginG', {
				errors:[
					'Logged in successfully!!'
				],
			});
			return;
		}
		
     var ngayHetHan = result[0].ngayHetHan;

      x =  ngayHetHan.slice(0, 2);
      y =  ngayHetHan.slice(3, 5);
      z =  ngayHetHan.slice(6,10);

      var g = new Date();
      g.setDate(x);
      g.setMonth(y-1);
      g.setFullYear(z);
       var date = new Date(g);
      var e = date.getTime();
      
      var f = now.getTime();

      if(f <= e){
		//req.session.username = result[0].username;
		console.log(result[0].userId)
	} else {
		res.render('auth/login', {
						errors:[
					'Thẻ của bản đã quá hạn, bạn cần phải đến chỗ thủ thư để mở khóa!!'
				],
				values: req.body
			});
				return;
	};
});
};