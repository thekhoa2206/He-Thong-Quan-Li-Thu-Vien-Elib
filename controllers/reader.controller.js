var mysql = require('mysql')
var con = require('../mysql-connection')
const shortid = require('shortid')
var md5 = require('md5')


module.exports.index = function (req, res) {
  userId = 3;
    con.query('SELECT * FROM readers WHERE userId=?',userId, function (err, result) { // retrieve data 
    if (err) throw err; 
    res.render('./readers/readers', { readers: result});
  });
};

module.exports.searchReader = function(req, res){
  var readerId = 3;
  var q = req.query.q;
  con.query('SELECT * FROM readers WHERE userId =?',readerId, function (err, result) { // retrieve data 
    if (err) throw err;
    console.log(result);
    var matchedReaders = result.filter(function(reader){
      return reader.nameUser.toLowerCase().indexOf(q.toLowerCase()) !== -1;
    });
    res.render('./readers/readers', { readers: matchedReaders});
  }); 
};

module.exports.viewReaders = function(req, res){
  var readerId = req.params.readerId;
  con.query('SELECT * FROM readers WHERE readerId = ?', readerId, function (err, result) { 
    con.query('SELECT * FROM time WHERE readerId = ?', readerId, function (err, result1) {
    
  if (err) throw err;
  res.render('./readers/viewReader', { readers: result, time: result1});
})
});
};

module.exports.createReader= function (req, res) {
  res.render('./readers/createReader')
};

module.exports.postCreateReader= function (req, res) {
  req.body.readerId = shortid.generate(); //generate random id
  var userId = 3;
  
  var date = new Date();
  var year = date.getFullYear().toString();
  var month = (date.getMonth() + 101).toString().substring(1);
  var day = (date.getDate() + 100).toString().substring(1);
  ngayTao = day + '/' + month + '/' + year;
 
  var e = date.getTime()+ 86400*1000*30*3*req.body.numbers;
  
   var g = new Date(e)
  var year = g.getFullYear().toString();
  var month = (g.getMonth() + 101).toString().substring(1);
  var day = (g.getDate() + 100).toString().substring(1);
  ngayHetHan = day + '/' + month + '/' + year;

      var a = new Date();
      var ngay = (a.getDate() + 100).toString().substring(1);
      var thang = (a.getMonth() + 101).toString().substring(1);
      var nam = a.getFullYear().toString();

      var dateAdd = ngay +'/' +month +'/' +year;
      var cost = req.body.numbers*200000;
      console.log(dateAdd)
      var value1 = [
      idCost,
      cost,
      req.params.readerId,
      dateAdd
      ];
      console.log(value1)
      con.query('INSERT INTO cost (idCost, cost, readerId, dateAdd) VALUES (?)',[value1], function(err, result){
        if(err) throw err;
            console.log("1 record inserted"); //checked
        });

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

module.exports.addTimes = function(req, res){
   var readerId = req.params.readerId; 
     con.query('SELECT * FROM readers WHERE readerId = ?',readerId, function (err, result){
    if (err) throw err;
    res.render('./readers/addTime', {readers : result});
});
};

module.exports.postAddTimes = function(req, res){
     var readerId = req.params.readerId;
     var idCost = shortid.generate();
    con.query('SELECT * FROM readers WHERE readerId = ?',readerId, function (err, result){
     //var ngayTao = result[0].ngayTao;
     var ngayHetHan = result[0].ngayHetHan;
     //console.log(ngayHetHan);
      x =  ngayHetHan.slice(0, 2);
      y =  ngayHetHan.slice(3, 5);
      z =  ngayHetHan.slice(6,10);

       var g = new Date();
      g.setDate(x);
      g.setMonth(y);
      g.setFullYear(z);
       var date = new Date(g);
      var e = date.getTime()
      //console.log(e);  //test

      var f = e + 86400*1000*90*req.body.numbers;

      var g = new Date(f)
      var year = g.getFullYear().toString();
      var month = (g.getMonth() + 101).toString().substring(1)-1;
      var day = (g.getDate() + 100).toString().substring(1);
      ngayHetHan = day + '/' + month + '/' + year;

      var day = new Date();
      var ngay = (day.getDate() + 100).toString().substring(1);
      var thang = (day.getMonth() + 101).toString().substring(1);
      var nam = day.getFullYear().toString();

      var dateAdd = ngay +'/' +thang +'/' +nam;
      var cost = req.body.numbers*200000;
      console.log(dateAdd)
      var value1 = [
      idCost,
      cost,
      req.params.readerId,
      dateAdd
      ];
      console.log(value1)
      con.query('INSERT INTO cost (idCost, cost, readerId, dateAdd) VALUES (?)',[value1], function(err, result){
        if(err) throw err;
            console.log("1 record inserted"); //checked
        });
  con.query('UPDATE readers SET ngayHetHan = ? WHERE readerId=?',[ngayHetHan, req.params.readerId], function(err, result){
        if(err) throw err;
            console.log("1 record inserted"); //checked
 res.redirect('/readers');
 });
});
};