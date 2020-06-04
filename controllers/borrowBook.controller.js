var mysql = require('mysql')
var con = require('../mysql-connection')
const shortid = require('shortid')
module.exports.borrowBooks = function (req, res) {
   var bookId = req.body.bookId
   var readerId = req.body.readerId;
    con.query('SELECT borrowing.readerId,books.author, books.kind, borrowing.bookId, books.bookId, readers.readerId, borrowing.ngayMuon, borrowing.ngayTra, books.name, readers.nameUser FROM borrowing, books, readers WHERE borrowing.bookId = books.bookId AND borrowing.readerId=readers.readerId ', function (err, result) { // retrieve data 
    if (err) throw err;
    res.render('./borrowing/viewBorrowReader',{borrows : result});
  });
}; 

module.exports.returnBook = function(req, res){
   res.render('./books/returnBook')
};

module.exports.postReturnBook = function(req, res){
  var errors = [];
  var bookId = req.body.bookId;
  returnId = shortid.generate();
  var date = new Date();
  var year = date.getFullYear().toString();
  var month = (date.getMonth() + 101).toString().substring(1);
  var day = (date.getDate() + 100).toString().substring(1);
  dateReturn = day + '/' + month + '/' + year;

  con.query('SELECT * FROM borrowing WHERE bookId = ? ', bookId, function(err, result){
      if (err) throw err;
      readerId = result[0].readerId;
      var values = [
          bookId, 
          returnId,
          readerId, 
          dateReturn
      ];
      var status = "còn"

      con.query('DELETE FROM borrowing WHERE bookId = ?',bookId, function (err, result){
          if (err) throw err;
            con.query('INSERT INTO returning (bookId, returnId, readerId, dateReturn) VALUES(?) ', [values], function(err, result){
              if(err) throw err;
              console.log("1 record inserted");

                con.query('SELECT (quantity) AS QuantityBook FROM books WHERE bookId = ?',bookId, function (err, result){
                    if (err) throw err; 
                    var quantity = result[0].QuantityBook;
                    quantity = quantity + 1;
                    console.log(quantity);

                    con.query('UPDATE books SET quantity = ?,status=? WHERE bookId=?',[quantity,status, bookId], function(err, result){
                        if(err) throw err;
                        console.log("1 record inserted"); //checked
                        errors.push("Trả Sách Thành Công");
                        console.log("Trả Sách Thành Công");
                    });
                });
            });
      
      res.render('./books/returnBook',{ 
             errors: errors
            });
});
});
};

