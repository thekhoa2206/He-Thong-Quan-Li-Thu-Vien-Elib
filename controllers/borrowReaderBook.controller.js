var mysql = require('mysql')
var con = require('../mysql-connection')
const shortid = require('shortid')
var md5 = require('md5');

module.exports.books = function (req, res) {
   var bookId = req.body.bookId;
    var readerId = req.session.readerId;
    con.query('SELECT * FROM books ', function (err, result) {
     if (err) throw err;
    res.render('./borrowing/readerBook', { books: result}); // retrieve data 
    });
};

module.exports.searchBooks = function(req, res){
  var bookId = req.session.bookId;
  var q = req.query.q;
  con.query('SELECT * FROM books ', bookId, function (err, result) { // retrieve data 
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
     var tra2;
     var now1;
     var now;
     var tra1;

  var bookId = req.body.bookId;
  var readerId = req.session.readerId;
  req.body.borrowId = shortid.generate(); //generate random id

  var date = new Date();                                                //tạo ngày mượn sách
  var year = date.getFullYear().toString();
  var month = (date.getMonth() + 101).toString().substring(1);
  var day = (date.getDate() + 100).toString().substring(1);
  ngayMuon = day + '/' + month + '/' + year;

  var e = date.getTime()+ 86400*1000*45;

  var g = new Date(e)                                                
  var year = g.getFullYear().toString();
  var month = (g.getMonth() + 101).toString().substring(1);
  var day = (g.getDate() + 100).toString().substring(1);
  ngayTra = day + '/' + month + '/' + year;                                 // tạo ngày trả (45 ngày từ ngày mượn)
  
  //console.log(bookId);


 con.query('SELECT COUNT (readerId) AS NumberOfBook FROM borrowing WHERE readerId = ?' , readerId , function(err, result){ //đếm số sách đã mượn của người đọc
    var numberOfBook = result[0].NumberOfBook;
    console.log(numberOfBook);
    if(numberOfBook < 3){
      var values = [
          req.body.bookId, 
          readerId, 
          ngayMuon,
          ngayTra,
          req.body.borrowId
      ]; // create an array that include user inputs 
      var status = "đã mượn";
      if(numberOfBook == 0){
        console.log(req.body) //test
        con.query('INSERT INTO borrowing (bookId, readerId, ngayMuon, ngayTra, borrowId) VALUES (?)',[values], function(err, result){ // thêm thông tin người đọc đã mượn sách
          if(err) throw err;
            console.log("1 record inserted"); //checked

              con.query('SELECT (quantity) AS QuantityBook FROM books WHERE bookId = ?',bookId, function (err, result){ // lấy ra số lượng của sách để -1 khi mượn
                if (err) throw err; 
                  var quantity = result[0].QuantityBook;
                  quantity = quantity-1;
                  console.log(quantity);

                      con.query('UPDATE books SET quantity = ?,status = ? WHERE bookId=?',[quantity,status, bookId], function(err, result){ //update số lượng và trạng thái của sách đã mượn ở bảng books
                          if(err) throw err;
                          console.log("1 record inserted"); //checked
                      });
              });
                res.redirect('/borrowing/viewReader')// update added dream
        });
      };

      if(numberOfBook ==1){
          con.query('SELECT * FROM borrowing WHERE readerId=?',readerId, function (err, result) { //lấy dữ liệu ngày trả sách từ bảng borrowing

              x1 =  result[0].ngayTra.slice(0, 2);
              y1 =  result[0].ngayTra.slice(3, 5);
              z1 =  result[0].ngayTra.slice(6,10);
              tra1 = new Date();
              
              tra1.setDate(x1);
              tra1.setMonth(y1-1);
              tra1.setFullYear(z1);

              var date = new Date(tra1);
              tra1 = date.getTime();

              now = new Date();
              now = now.getTime();
              // console.log(now);
              // console.log(tra1);

          if(now >= tra1){
            errors.push("Bạn đang có sách mượn quá 45 ngày!!");
          };
          if(errors.length){
              res.render('./borrowing/borrowBook',{
                  errors: errors
              });
            return;
          };

      if(now < tra1){
          console.log(req.body) //test
          con.query('INSERT INTO borrowing (bookId, readerId, ngayMuon, ngayTra, borrowId) VALUES (?)',[values], function(err, result){ // thêm thông tin người đọc đã mượn sách
              if(err) throw err;
              console.log("1 record inserted"); //checked

                  con.query('SELECT (quantity) AS QuantityBook FROM books WHERE bookId = ?',bookId, function (err, result){ // lấy ra số lượng của sách để -1 khi mượn
                        if (err) throw err; 
                        var quantity = result[0].QuantityBook;
                        quantity = quantity-1;
                        console.log(quantity);

                            con.query('UPDATE books SET quantity = ?,status = ? WHERE bookId=?',[quantity,status, bookId], function(err, result){ //update số lượng và trạng thái của sách đã mượn ở bảng books
                                if(err) throw err;
                                console.log("1 record inserted"); //checked
                            });
                  });
              res.redirect('/borrowing/viewReader')// update added dream
          });
      };
    });
  };


  if(numberOfBook ==2){
    con.query('SELECT * FROM borrowing WHERE readerId=?',readerId, function (err, result) { //lấy dữ liệu ngày trả sách từ bảng borrowing
        x1 =  result[0].ngayTra.slice(0, 2);
        y1 =  result[0].ngayTra.slice(3, 5);
        z1 =  result[0].ngayTra.slice(6,10);
        tra1 = new Date();
        
        tra1.setDate(x1);
        tra1.setMonth(y1-1);
        tra1.setFullYear(z1);

        var date = new Date(tra1);
        tra1 = date.getTime();

        now = new Date();
        now = now.getTime();
        // console.log(now);
        // console.log(tra1);

        x2 =  result[1].ngayTra.slice(0, 2);
        y2 =  result[1].ngayTra.slice(3, 5);
        z2 =  result[1].ngayTra.slice(6,10);
        tra2 = new Date();    
        tra2.setDate(x2);
        tra2.setMonth(y2-1);
        tra2.setFullYear(z2);

        var date = new Date(tra2);
        tra2 = date.getTime();

        now1 = new Date();
        now1 = now1.getTime();
        console.log(now1);
        console.log(tra2);

        if(now1 >= tra2 || now >= tra1){
            errors.push("Bạn đang có sách mượn quá 45 ngày!!");
            console.log("Bạn đang có sách mượn quá 45 ngày!!")
        };
        if(errors.length){
            res.render('./borrowing/borrowBook',{
                errors: errors
            });
          return;
        };
        if(now < tra1 && now1 < tra2){
            console.log(req.body) //test
            con.query('INSERT INTO borrowing (bookId, readerId, ngayMuon, ngayTra, borrowId) VALUES (?)',[values], function(err, result){ // thêm thông tin người đọc đã mượn sách
                if(err) throw err;
                console.log("1 record inserted"); //checked

                    con.query('SELECT (quantity) AS QuantityBook FROM books WHERE bookId = ?',bookId, function (err, result){ // lấy ra số lượng của sách để -1 khi mượn
                        if (err) throw err; 
                        var quantity = result[0].QuantityBook;
                        quantity = quantity-1;
                        console.log(quantity);

                        con.query('UPDATE books SET quantity = ?,status = ? WHERE bookId=?',[quantity,status, bookId], function(err, result){ //update số lượng và trạng thái của sách đã mượn ở bảng books
                            if(err) throw err;
                            console.log("1 record inserted"); //checked
                        });
                    });
                res.redirect('/borrowing/viewReader')// update added dream
            });
        };
    });      
  };
};


    if(numberOfBook >= 3) {
   errors.push("Bạn Đã Mượn Quá 3 Quyển Sách Nên Không Thể Mượn Được Tiếp!!!!");   // nếu lớn hơn 3 quyển sách thì sẽ không được mượn tiếp
    };

    if(errors.length){
      res.render('./borrowing/borrowBook',{
        errors: errors
      });
      return;
    };
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



module.exports.changePassword = function(req, res){
  res.render('./readers/changePassword');
};

module.exports.postChangePassword = function(req, res){
   var errors = [];
   var readerId= req.session.readerId
   var oldPassword = md5(req.body.oldPassword);
  var newPassword = md5(req.body.newPassword);
  var confirmPassword = md5(req.body.confirmPassword);
  con.query('SELECT * FROM readers WHERE readerId = ?',readerId, function (err, result){ 
  var password = result[0].password;

  if(oldPassword.localeCompare(password) ==0 && newPassword.localeCompare(confirmPassword)==0){
  con.query('UPDATE readers SET password = ? WHERE readerId =? ',[newPassword, readerId],  function(err, result){
    if (err) throw err;
     res.redirect('/borrowing');
  });

  };

           //check các điều kiện về mật khẩu khi độc giả đổi mật khẩu của mình
     if(oldPassword.localeCompare(password) !=0 && newPassword.localeCompare(confirmPassword)==0){
    errors.push("Old password wrong!!");
    };
    if(newPassword.localeCompare(confirmPassword) !=0 && oldPassword.localeCompare(password) ==0 ){
    errors.push("Cofirm password wrong!!");
    };
    if(newPassword.localeCompare(confirmPassword) !=0 && oldPassword.localeCompare(password) !=0 ){
    errors.push("Old password and confirm Password wrong!!");
    };
    if(newPassword.localeCompare(password) ==0 && oldPassword.localeCompare(password) ==0 && newPassword.localeCompare(confirmPassword) ==0){
    errors.push("You can't use Old Password!!");
    };
    if(errors.length){
        res.render('./readers/changePassword', {
      errors: errors,
      values: req.body
    });
    return;
  }


 });
};