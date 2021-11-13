function errorHandler(err, req, res, next) {
  if (err.name === 'UnauthorizedError') {
    return res.status(err.status).json({ message: 'User is not authorized' })
  }
  if (err.name === 'ValidationError') {
    return res.status(err.status).json({ message: err })
  }
  return res.status(err.status).json({ message: err.message })
}

module.exports = errorHandler
