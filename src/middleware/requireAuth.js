const jwt = require('jsonwebtoken')
const createError = require('http-errors')

module.exports = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(' ')[1]
    const decodedToken = jwt.verify(token, process.env.TOKEN_SECRET)

    req.userId = decodedToken.userId

    next()
  } catch (err) {
    next(createError.Unauthorized())
  }
}
