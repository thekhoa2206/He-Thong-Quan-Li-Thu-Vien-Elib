var mysql = require('mysql')
var con = require('../mysql-connection')
const shortid = require('shortid')

module.exports.books = function (req, res) {
   var bookId = req.body.bookId;
   var quantity = 1;
    con.query('SELECT * FROM books WHERE quantity = ?', quantity, function (err, result) { // retrieve data 
    if (err) throw err;
    res.render('./borrowing/readerBook', { books: result});
  });
};

module.exports.searchBooks = function(req, res){
  var bookId = req.params.bookId;
  var q = req.query.q;
  con.query('SELECT * FROM books WHERE bookId=?', bookId, function (err, result) { // retrieve data 
    if (err) throw err;
    //console.log(result);
    var matchedBooks = result.filter(function(book){
      return book.name.toLowerCase().indexOf(q.toLowerCase()) !== -1;
    });
    res.render('./borrowing/readerBook', { books: matchedBooks});
  });
};

module.exports.borrowBook = function (req, res) {
   var bookId = req.params.bookId
   var readerId = req.session.readerId;
    res.render('./borrowing/borrowBook');
};

module.exports.postBorrowBook = function (req, res) {
   var errors = [];
  var bookId = req.body.bookId;
  var readerId = req.session.readerId;
  req.body.borrowId = shortid.generate(); //generate random id

  var date = new Date();
  var year = date.getFullYear().toString();
  var month = (date.getMonth() + 101).toString().substring(1);
  var day = (date.getDate() + 100).toString().substring(1);
  ngayMuon = day + '/' + month + '/' + year;

  var e = date.getTime()+ 86400*1000*45;

  var g = new Date(e)
  var year = g.getFullYear().toString();
  var month = (g.getMonth() + 101).toString().substring(1);
  var day = (g.getDate() + 100).toString().substring(1);
  ngayTra = day + '/' + month + '/' + year;
  
  //console.log(bookId);

 con.query('SELECT COUNT (readerId) AS NumberOfBook FROM borrowing WHERE readerId = ?' , readerId , function(err, result){
 var numberOfBook = result[0].NumberOfBook;
  //console.log(numberOfBook);
  if(numberOfBook < 3){
   var values = [
        req.body.bookId, 
        readerId, 
        ngayMuon,
        ngayTra,
        req.body.borrowId
  ]; // create an array that include user inputs 

  
  console.log(req.body) //test
    con.query('INSERT INTO borrowing (bookId, readerId, ngayMuon, ngayTra, borrowId) VALUES (?)',[values], function(err, result){
        if(err) throw err;
            console.log("1 record inserted"); //checked
    con.query('SELECT (quantity) AS QuantityBook FROM books WHERE bookId = ?',bookId, function (err, result){
    if (err) throw err; 
     var quantity = result[0].QuantityBook;
     quantity = quantity-1;
    console.log(quantity);
        con.query('UPDATE books SET quantity = ? WHERE bookId=?',[quantity, bookId], function(err, result){
        if(err) throw err;
            console.log("1 record inserted"); //checked
        });
  });
           res.redirect('/borrowing/viewReader')// update added dream
        });
    };
    if(numberOfBook >= 3) {
   errors.push("Bạn Đã Mượn Quá 3 Quyển Sách Nên Không Thể Mượn Được Tiếp!!!!");
  };
    if(errors.length){
      res.render('./borrowing/borrowBook',{
        errors: errors
      });
      return;
    }
});
};

module.exports.viewReader = function(req, res) {
   var readerId = req.session.readerId;
    con.query('SELECT borrowing.readerId, books.author, books.kind, borrowing.bookId, books.bookId, readers.readerId, borrowing.ngayMuon, borrowing.ngayTra, books.name, readers.nameUser, readers.ngayTao, readers.ngayHetHan FROM borrowing, books, readers WHERE borrowing.bookId = books.bookId AND borrowing.readerId=readers.readerId AND readers.readerId=?',readerId, function (err, result) { // retrieve data 
    if (err) throw err;
    console.log(result[0])
    res.render('./borrowing/viewReader',{borrows : result});
  });
};
