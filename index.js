const express = require('express')
const app = express()
const usersRoute = require('./routes/usersRoute')
const bodyParser = require('body-parser')
 
app.use(bodyParser.json())
 
app.use('/users', usersRoute)
 
app.listen(7777, () => {
   console.log("app is up!")
})
