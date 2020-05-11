var mysql = require('mysql')
var con = require('../mysql-connection')
const shortid = require('shortid')
var md5 = require('md5')


module.exports.index = function (req, res) {
    con.query('SELECT * FROM readers', function (err, result) { // retrieve data 
    if (err) throw err;
    res.render('./readers/readers', { readers: result});
  });
};

module.exports.viewReaders = function(req, res){
  var readerId = req.params.readerId;
  con.query('SELECT * FROM readers WHERE readerId = ?', readerId, function (err, result) { 
  if (err) throw err;
  res.render('./readers/viewReader', { readers: result});
});
};

module.exports.createReader= function (req, res) {
  res.render('./readers/createReader')
};

module.exports.postCreateReader= function (req, res) {
  req.body.readerId = shortid.generate(); //generate random id
  var userId = 3
  var values = [
        md5(req.body.password),
        req.body.nameUser, 
        req.body.dateOfBirth,
        req.body.gender,
        req.body.phone,
        req.body.email,
        req.body.address,
        req.body.readerId,
        userId
  ]; // create an array that include user inputs 
  console.log(req.body) //test
    con.query('INSERT INTO readers ( password, nameUser, dateOfBirth, gender, phone, email, address, readerId, userId) VALUES (?)',[values], function(err, result){
        if(err) throw err;
            console.log("1 record inserted"); //checked
        });
  res.redirect('/readers')// update added dream
};

module.exports.editReaders = function(req, res){
  var readerId = req.params.readerId; 
  con.query('SELECT * FROM readers WHERE readerId = ?',readerId, function (err, result){
    if (err) throw err;
    //console.log(result[0].readerId);
    res.render('./readers/editReader', {readers : result});
});
};

module.exports.postEditReaders =  function(req, res){
  var readerId = req.params.readerId
  con.query('UPDATE readers SET nameUser = ? ,password = ?, dateOfBirth=?, gender=?, phone=?, address=?, email=?  WHERE readerId =? ',[req.body.nameUser, md5(req.body.password), req.body.dateOfBirth, req.body.gender, req.body.phone, req.body.address, req.body.email, req.params.readerId],  function(err, result){
    if (err) throw err;
     res.redirect('/readers');
  });
};

module.exports.deleteReaders = function(req, res){
   var readerId = req.params.readerId
  con.query('DELETE FROM readers WHERE readerId = ?',readerId, function (err, result){
    if (err) throw err;
  res.redirect('/readers');
 });
};