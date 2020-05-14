var mysql = require('mysql')
var con = require('../mysql-connection')
const shortid = require('shortid')
var md5 = require('md5')


module.exports.index = function (req, res) {
	userId = "2";
    con.query('SELECT * FROM readers WHERE userId = ?',userId, function (err, result) { // retrieve data 
    if (err) throw err;
    res.render('./librarians/librarians', { readers: result});
  });
};


module.exports.createLibrarian= function (req, res) {
  res.render('./librarians/createLibrarian')
};

module.exports.postCreateLibrarian= function (req, res) {
  req.body.readerId = shortid.generate(); //generate random id
  var userId = 2;

  var date = new Date();
  var year = date.getFullYear().toString();
  var month = (date.getMonth() + 101).toString().substring(1);
  var day = (date.getDate() + 100).toString().substring(1);
  ngayTao = day + '/' + month + '/' + year;

  ngayHetHan = "00/00/0000"; 
    var values = [
        md5(req.body.password),
        req.body.nameUser, 
        req.body.dateOfBirth,
        req.body.gender,
        req.body.phone,
        req.body.email,
        req.body.address,
        req.body.readerId,
        userId,
        ngayTao,
        ngayHetHan
  ]; // create an array that include user inputs 
  console.log(req.body) //test
    con.query('INSERT INTO readers ( password, nameUser, dateOfBirth, gender, phone, email, address, readerId, userId, ngayTao, ngayHetHan) VALUES (?)',[values], function(err, result){
        if(err) throw err;
            console.log("1 record inserted"); //checked
        });
  res.redirect('/librarians')// update added dream
};


module.exports.editLibrarian = function(req, res){
  var readerId = req.params.readerId; 
  con.query('SELECT * FROM readers WHERE readerId = ?',readerId, function (err, result){
    if (err) throw err;
    //console.log(result[0].readerId);
    res.render('./librarians/editLibrarian', {readers : result});
});
};

module.exports.postEditLibrarian  =  function(req, res){
  var readerId = req.params.readerId
  con.query('UPDATE readers SET nameUser = ? ,password = ?, dateOfBirth=?, gender=?, phone=?, address=?, email=?  WHERE readerId =? ',[req.body.nameUser, md5(req.body.password), req.body.dateOfBirth, req.body.gender, req.body.phone, req.body.address, req.body.email, req.params.readerId],  function(err, result){
    if (err) throw err;
     res.redirect('/librarians');
  });
};

module.exports.deleteLibrarian = function(req, res){
   var readerId = req.params.readerId
  con.query('DELETE FROM readers WHERE readerId = ?',readerId, function (err, result){
    if (err) throw err;
  res.redirect('/librarians');
 });
};