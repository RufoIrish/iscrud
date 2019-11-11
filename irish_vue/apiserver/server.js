var express = require('express')
var app = express()
var body = require('body-parser')
var cors = require('cors')
var port = 3000

app.use(body.json())
app.use(body.urlencoded({ extended: false }))
app.use(cors())

var db = []
// var doing = []
app.post('/Add', function (req, res) {
  var data = req.body
  var datai = {
    id: db.length + 1,
    task: data.task,
    done: data.done,
    schedule: data.schedule
  }
  db.push(datai)
  // console.log("db=", db)
  res.status(200).json({ message: "succesfully added!" })
})

app.post('/getdata', function (req, res) {
  console.log("get", db)
  res.send(db)
})

// app.post('/doing', function (req, res) {
//   var data = req.body
//   for (var i = 0; i < db.length; i++) {
//     console.log("data : "+ data)
//     console.log(db[i].id +" vs "+ data.doing.id)
//     if (db[i].id == data.doing.id) {
//       db[i].doing=true
//       console.log("doing !!!")
//     }
//   }
//   res.send(db)
//   console.log("db", db)
// })

app.post('/done', function (req, res) {
  var data = req.body
  for (var i = 0; i < db.length; i++) {
    // console.log("data : "+ data)
    // console.log(db[i].id +" vs "+ data.done.id)
    if (db[i].id == data.done.id) {
      db[i].done = true
      // console.log("doing !!!")
    }
  }
  res.send(db)
  console.log("db", db)


})
app.post('/delete', function (req, res) {
  var data = req.body
  for (var i = 0; i < db.length; i++) {
    // console.log("data : "+ data)
    // console.log(db[i].id +" vs "+ data.done.id)
    if (db[i].id == data.done.id) {
      db[i].remove()
      console.log(db)
      // console.log("doing !!!")
    }
  }
  res.send(db)
  console.log("db", db)
})


app.post('/getItem', (req, res) => {
  var done = false;
  for (var i = 0; i < db.length; ++i) {
    if (db[i].id == req.body.id) {
      done = true;
      res.status(200).json({ item: db[i] });
    }
  }
  if (!done) {
    res.status(404).json({ data: "not found" });
  }
})

app.post("/edit", (req, res) => {
  var done = false;
  db.forEach(item => {
    if (item.id == req.body.id) {
      done = true;
      item.task = req.body.task;
      item.schedule = req.body.schedule;
    }
    console.log(item);
    res.status(200).json({message: "successfully edited"});
  })
  if  (!done) {
    res.status(400).json({mesage: "error occured!"});
  }
})

app.listen(port, function () {
  console.log("listening to port 3000!")
})