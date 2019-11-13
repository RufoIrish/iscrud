var express = require('express')
var app = express()
var body = require('body-parser')
var cors = require('cors')
var port = 3000
var mysql = require('mysql')


app.use(body.json())
app.use(body.urlencoded({ extended: false }))
app.use(cors())


var connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'irishbacklogs'
})
connection.connect(function(){
  console.log("connected to database!")
})
var name ;

// var db = []
// var doing = []
// app.post('/Add', function (req, res) {
//   var data = req.body
//   var datai = {
//     id: db.length + 1,
//     task: data.task,
//     done: data.done,
//     schedule: data.schedule
//   }
//   db.push(datai)
//   res.status(200).json({ message: "succesfully added!" })
// })

app.post('/Add', (req, res) => {
  var data = req.body
  connection.query("Insert into backlogs (task, schedule, done,nickname) Values ('"+data.task+"','"+data.schedule+"','"+data.done+"','"+name+"')"
    , function (err, rows, fields) {
      res.send(rows)
      console.log(rows)
      if (err) throw err
      console.log('The solution is: ', rows)
    })
  // res.send(data);
})

// app.post('/getdata', function (req, res) {
//   console.log("get", db)
//   res.send(db)
// })

app.post('/getdata', (req, res) => {
  connection.query("SELECT * from backlogs where nickname = '" + name +"'", function (err, rows, fields) { 
    res.send(rows)
    console.log("rows in get data ", rows)
    if (err) throw err
    console.log('The solution is: ', rows)
  })
  // res.send(data);
})

app.post('/name', (req, res) => {
 name = req.body.name
 console.log("name ni niya : ", name)
  res.send("success");
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

// app.post('/done', function (req, res) {
//   var data = req.body
//   for (var i = 0; i < db.length; i++) {
//     if (db[i].id == data.done.id) {
//       db[i].done = true
//     }
//   }
//   res.send(db)
//   console.log("db", db)
// })

app.post('/done', (req, res) => {
  var data = req.body
  var id= data.done.id
  console.log(data.done.id ,"done id ")
  connection.query("update backlogs set  done = 1 where id = " + id
    , function (err, rows, fields) {
      res.send(rows)
      console.log("update done : ",rows)
      if (err) throw err
      console.log('The solution is: ', rows)
    })
})

// app.post('/delete', function (req, res) {
//   for (var i = 0; i < db.length; ++i) {
//     if (db[i].id == req.body.task) {
//   console.log("request : ", req.body.task, "  ",db[i].id)
//         db.splice(i,1)
//     }
//   }
//   res.status(200).json({db });
// })

app.post('/delete', (req, res) => {
  var data = req.body
  var id = data.delete.id
  console.log("id delete : ", id)
  connection.query("delete from backlogs where id = " + id
    , function (err, rows, fields) {
      // res.status(200).json({rows });
      res.send(rows)
         if (err) throw err
    console.log('error!')

    })
 
})



// app.post('/getItem', (req, res) => {
//   var done = false;
//   for (var i = 0; i < db.length; ++i) {
//     if (db[i].id == req.body.id) {
//       done = true;
//       res.status(200).json({ item: db[i] });
//     }
//   }
//   if (!done) {
//     res.status(404).json({ data: "not found" });
//   }
// })

app.post('/getItem', (req, res) => {
  var data = req.body
  // var done = false
  connection.query('SELECT * from backlogs where id =' + data.id, function (err, rows, fields) {
    // done = true;
    res.send(rows)
    // res.status(200).json({ item: rows});
    console.log( rows)
    if (err) throw err
    console.log('The solution is: ', rows)
  })
  // res.send(data);
})



// app.post('/clear', (req, res) => {

//   for (var i = 0; i < db.length; ++i) {
//     if (db[i].id == req.body.id) {
//       if(db[i].done == true){
//         db.remove(db[i])
//       }
//     }
//   }
//   res.status(200).json({db });

//   // if (!done) {
//   //   res.status(404).json({ data: "not found" });
//   // }
// })

app.post('/clear', (req, res) => {
  var data = req.body
  var id = data.id
  connection.query("delete from backlogs where done = 1"
    , function (err, rows, fields) {
      res.send(rows)
      console.log(rows)
      if (err) throw err
      console.log('The solution is: ', rows)
    })
})




// app.post("/edit", (req, res) => {
//   var done = false;
//   db.forEach(item => {
//     if (item.id == req.body.id) {
//       done = true;
//       item.task = req.body.task;
//       item.schedule = req.body.schedule;
//     }
//     console.log(item);
//     res.status(200).json({message: "successfully edited"});
//   })
//   if  (!done) {
//     res.status(400).json({mesage: "error occured!"});
//   }
// })

app.post('/edit', (req, res) => {
  var data = req.body
  var id= data.id
  var done =false
  var schedule = data.schedule
  var task = data.task
  // var done = 0
  connection.query("update backlogs set schedule = '"+schedule+"',task = '"+task+"' where id = " + id
    , function (err, rows, fields) {
      res.send(rows)
      // console.log(rows)
      if (err) throw err
      console.log("error!")
  
    })
})



app.listen(port, function () {
  console.log("listening to port 3000!")
})