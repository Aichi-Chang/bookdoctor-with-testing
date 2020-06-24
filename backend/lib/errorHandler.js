function errorHandler(err, req, res, next) {
  // this will catch the validaiton error
  if (err.name === 'ValidationError') {
    const errors = {}

    for (const key in err.errors) {
      console.log(err.errors)
      errors[key] = err.errors[key].message
    }
    return res.status(422).json({ message: 'Unprocessable Entry', errors })
  }
  res.status(500)
  next(err)
}

module.exports = errorHandler