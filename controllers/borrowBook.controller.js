var mysql = require('mysql')
var con = require('../mysql-connection')

module.exports.borrowBooks = function (req, res) {
   var bookId = req.body.bookId
   var readerId = req.body.readerId;
    con.query('SELECT borrowing.readerId,books.author, books.kind, borrowing.bookId, books.bookId, readers.readerId, borrowing.ngayMuon, borrowing.ngayTra, books.name, readers.nameUser FROM borrowing, books, readers WHERE borrowing.bookId = books.bookId AND borrowing.readerId=readers.readerId ', function (err, result) { // retrieve data 
    if (err) throw err;
    res.render('./borrowing/viewBorrowReader',{borrows : result});
  });
};


