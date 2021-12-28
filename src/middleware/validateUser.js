const createError = require('http-errors');
const userSchema = require('../validations/user.validation');

module.exports = async (req, res, next) => {
  try {
    await userSchema.validate(req.body);
    next();
  } catch (err) {
    next(createError(400, err));
  }
};
