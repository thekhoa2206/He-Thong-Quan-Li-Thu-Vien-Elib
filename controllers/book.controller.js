var mysql = require('mysql')
var con = require('../mysql-connection')
const shortid = require('shortid')


module.exports.books = function (req, res) {
   var bookId = req.body.bookId
    con.query('SELECT * FROM books ', function (err, result) { // retrieve data 
    if (err) throw err;
    res.render('./books/books', { books: result});
  });
};

module.exports.searchBook = function(req, res){
  var q = req.query.q;
  con.query('SELECT * FROM books ', function (err, result) { // retrieve data 
    if (err) throw err;
    console.log(result);
    var matchedBooks = result.filter(function(book){
      return book.name.toLowerCase().indexOf(q.toLowerCase()) !== -1;
    });
    res.render('./books/books', { books: matchedBooks});
  }); 
};


module.exports.createBook = function (req, res) {
  res.render('./books/createBook');
};
module.exports.postCreateBook = function (req, res) {
 req.body.bookId = shortid.generate(); //generate random id
 quantity = 1;
  var values = [
        req.body.bookId, 
        req.body.name, 
        req.body.id,
        quantity,
        req.body.author,
        req.body.publishingYear,
        req.body.kind,
        req.body.address,
        req.body.NXB
  ]; // create an array that include user inputs 
  console.log(req.body) //test
    con.query('INSERT INTO books (bookId, name, id, quantity, author, publishingYear, kind, address, NXB) VALUES (?)',[values], function(err, result){
        if(err) throw err;
            console.log("1 record inserted"); //checked
        });
  res.redirect('/books')// update added dream
};


module.exports.editBook = function(req, res){
  var bookId = req.params.bookId; 
  con.query('SELECT * FROM books WHERE bookId = ?',bookId, function (err, result){
    if (err) throw err;
    //console.log(result[0].id);
    res.render('./books/editBook', {books : result});
});
};

module.exports.postEditBook =  function(req, res){
  con.query('UPDATE books SET name = ? ,id = ?, author=?, publishingYear=?, kind=?, address=?, NXB=? WHERE bookId =? ',[req.body.name, req.body.id, req.body.author, req.body.publishingYear, req.body.kind, req.body.address,req.body.NXB, req.params.bookId],  function(err, result){
    if (err) throw err;
     res.redirect('/books');
  });
};

module.exports.deleteBook = function(req, res){
   var bookId = req.params.bookId; 
  con.query('DELETE FROM books WHERE bookId = ?',bookId, function (err, result){
    if (err) throw err;
  res.redirect('/books');
 });
};

module.exports.returnBooks = function(req, res) {
  var bookId = req.body.bookId
   var readerId = req.body.readerId;
       con.query('SELECT returning.readerId, books.author, books.kind, returning.bookId, books.bookId, readers.readerId, returning.dateReturn, books.name, readers.nameUser FROM returning, books, readers WHERE returning.bookId = books.bookId AND returning.readerId=readers.readerId ', function (err, result) { // retrieve data 
    if (err) throw err;
    res.render('./books/viewReturnBook',{returns : result});
  });
};


