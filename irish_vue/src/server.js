const express = require('express')
const app = express()
const port = 3000
const add = require('./components/Add')

app.get('/', (req, res) => res.send('Hello World!'))
app.post('/add',(req,res) => res.send("succesfully added!"))

app.listen(port, () => console.log(`Example app listening on port ${port}!`))