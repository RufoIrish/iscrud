const express = require('express')
const app = express()
const port = 3000
const bodyparser = require('body-parser')
app.use(bodyparser.urlencoded({extended:true}))
app.use(bodyparser.json())
var mysql = require('mysql')
var connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'tododb'
})
connection.connect()

app.post('/send', (req, res) => {
    var data=req.body
    connection.query('SELECT 1 + 1 AS solution', function (err, rows, fields) {
        if (err) throw err
      
        console.log('The solution is: ', rows[0].solution)
      })
    res.send(data);
})










//connection.end()
app.listen(port, () => console.log(`Example app listening on port ${port}!`))