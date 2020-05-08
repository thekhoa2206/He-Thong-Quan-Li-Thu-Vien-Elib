var mysql = require('mysql');
var con = mysql.createConnection({
  host: "remotemysql.com",
  user: "zpEiBixc5V" ,
  password: "CnCb3SQsX3",
  database: "zpEiBixc5V"
});

con.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");
  /*var sql = "DELETE FROM users";
  con.query(sql, function (err, result) {
    if (err) throw err;
    
    console.log("Chenged");
  });*/
});

module.exports = con;