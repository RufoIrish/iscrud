const express = require('express')
const app = express()
const port = 3000
const bodyparser = require('body-parser')
app.use(bodyparser.urlencoded({ extended: true }))
app.use(bodyparser.json())
var mysql = require('mysql')
var connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'irishdb'
})
connection.connect()

app.post('/get', (req, res) => {
  var data = req.body
  connection.query('SELECT * from backlog', function (err, rows, fields) {
    res.send(rows)
    console.log(rows)
    if (err) throw err
    console.log('The solution is: ', rows)
  })
  // res.send(data);
})
app.post('/insert', (req, res) => {
  var datetime = new Date(Date.now()).toLocaleString();
  console.log(datetime)
  var data = req.body
  var backlog= data.backlog
  connection.query("Insert into backlog (user,backlog,date) Values ('irish','"+backlog+"','"+datetime+"')"
    , function (err, rows, fields) {
      res.send(rows)
      console.log(rows)
      if (err) throw err
      console.log('The solution is: ', rows)
    })
  // res.send(data);
})

app.post('/delete', (req, res) => {
  var data = req.body
  var id = data.id
  connection.query("delete from backlog where id = " + id
    , function (err, rows, fields) {
      res.send(rows)
      console.log(rows)
      if (err) throw err
      console.log('The solution is: ', rows)
    })
})

app.post('/update', (req, res) => {
  var datetime = new Date(Date.now()).toLocaleString();
  var data = req.body
  var id= data.id
  var newData = data.update
  connection.query("update backlogs set done = '"+newData+"',date = '"+datetime+"' where id = " + id
    , function (err, rows, fields) {
      res.send(rows)
      console.log(rows)
      if (err) throw err
      console.log('The solution is: ', rows)
    })
})

//connection.end()
app.listen(port, () => console.log(`Example app listening on port ${port}!`))