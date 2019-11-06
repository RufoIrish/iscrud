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
  connection.query('SELECT * from people', function (err, rows, fields) {
    res.send(rows)
    console.log(rows)
    if (err) throw err
    console.log('The solution is: ', rows)
  })
  // res.send(data);
})
app.post('/insert', (req, res) => {
  var data = req.body
  connection.query("Insert into people (fname,mname,lname) Values ('"+req.body+"')"
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
  connection.query("delete from people where id = 6"
    , function (err, rows, fields) {
      res.send(rows)
      console.log(rows)
      if (err) throw err
      console.log('The solution is: ', rows)
    })
})

app.post('/update', (req, res) => {
  var data = req.body
  connection.query("update people set mname = 'irsih rufo' where id = 9"
    , function (err, rows, fields) {
      res.send(rows)
      console.log(rows)
      if (err) throw err
      console.log('The solution is: ', rows)
    })
})

//connection.end()
app.listen(port, () => console.log(`Example app listening on port ${port}!`))