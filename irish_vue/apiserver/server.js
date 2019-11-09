var express = require('express')
var app = express()
var body = require('body-parser')
var cors = require('cors')
var port = 3000

app.use(body.json())
app.use(body.urlencoded({extended:false}))
app.use(cors())

var db =[]
app.post('/Add', function (req, res) {
    var data = req.body
    db.push(data)
    console.log("db=" ,db)
  res.send("added!")
})

app.post('/getdata', function (req, res) {
    console.log("get",db)
  res.send(db)
})

app.listen(port,function(){
    console.log("listening to port 3000!")
})