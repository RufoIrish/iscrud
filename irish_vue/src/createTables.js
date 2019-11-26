var mysql = require('mysql');

var con = mysql.createConnection({
  host: "localhost",
  user: "yourusername",
  password: "yourpassword",
  database: "irishbacklogs"
});

con.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");
  var sql = "CREATE TABLE backlogs (task VARCHAR(255), schedule VARCHAR(255), done BOOLEAN, nickname VARCHAR(255),id int NOT NULL AUTO_INCREMENT)";
  con.query(sql, function (err, result) {
    if (err) throw err;
    console.log("Table created");
  });
});