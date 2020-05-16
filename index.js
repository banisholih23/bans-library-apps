const { APP_PORT } = process.env
const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const cors = require('cors')
const morgan = require('morgan')

const route = require('./src/index')

var corsOption = {
  origin: 'http://localhost:5000/books',
  optionSuccessStatus: 200
}

const server = app.listen(5000, "localhost", () => {
  const host = server.address().address
  const port = server.address().port
  

  console.log("You' are connected at " + host + ":" + port);

})
// app.listen(APP_PORT, () => {
//   console.log(`Express app is running on port ${APP_PORT}`)
// })

app.use(morgan("dev"))

app.use(cors('*'))
app.options(cors(corsOption))

app.use(bodyParser.urlencoded( {
  extended: true
}))
app.use('/profile_picture', express.static('uploads'))

app.use('/', cors(), route)