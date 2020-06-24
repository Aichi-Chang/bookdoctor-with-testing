const port = process.env.PORT || 8000

module.exports = { 
  port,
  dbURI: process.env.MONGODB_URI,
  secret: process.env.SECRET
}