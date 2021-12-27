const userSchema = require('../validations/user.validation');

module.exports = async (req, res, next) => {
  try {
    await userSchema.validate(req.body);
    return next();
  } catch (err) {
    return res.status(400).json(err);
  }
};
