const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')

const { port, dbURI } = require('./config/environment')
const path = require('path')
const errorHandler = require('./lib/errorHandler')
const router = require('./router')


// ************************ connect mongo to mongoose ************************

mongoose.connect(dbURI,
  { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true },
  () => console.log('Mongo is connected'))
  .catch(err => console.log(err))


const app = express()

// ************************ middlewhere ************************

app.use(bodyParser.json())

app.use((req, res, next) => {
  console.log(`${req.method} to ${req.url}`)
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept')
  next()
})


// ************************ router ************************


app.use('/api', router)

app.use(errorHandler)

app.use('/', express.static('dist'))

app.get([
  '/',
  '/register',
  '/login',
  '/dashboard',
  '/about',
  '/appointment',
  '/history'
] , (req, res) => {
  res.sendFile(path.resolve('dist', 'index.html'))
})

app.get('/notfound', (req, res) => {
  res.status(404).sendFile(path.resolve('dist', 'index.html'))
})

app.use('/api/*', (req, res) => res.status(404).json({ message: 'Not Found' }))

// app.use('/*', (req, res) => {
//   res.redirect('/notfound')
// })

// ************************ listen to the port ************************

app.listen(port, () => console.log(`Up and running on port ${port}`))


module.exports = app

