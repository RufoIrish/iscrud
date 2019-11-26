var mysql = require('mysql');

var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "irishbacklogs"
});

con.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");
  var sql = "CREATE TABLE backlogs (id int NOT NULL AUTO_INCREMENT,task VARCHAR(255), schedule VARCHAR(255), done BOOLEAN, nickname VARCHAR(255),PRIMARY KEY (id))";
  con.query(sql, function (err, result) {
    if (err) throw err;
    console.log("Table created");
  });
});