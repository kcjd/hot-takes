module.exports = (err, req, res, next) => {
  const status = err.status || 500
  const message = err.message || 'something went wrong'

  res.status(status).send({ message })
  next()
}
