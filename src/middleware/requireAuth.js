const jwt = require('jsonwebtoken');
const createError = require('http-errors');

module.exports = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(' ')[1];
    jwt.verify(token, process.env.TOKEN_SECRET);

    next();
  } catch (err) {
    next(createError(401, 'unauthorized request'));
  }
};
