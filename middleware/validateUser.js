const yup = require('yup');

const userSchema = yup.object({
  password: yup
    .string()
    .min(8)
    .matches(/.*[A-Z]/, 'password must contain one uppercase letter')
    .matches(/.*[0-9]/, 'password must contain one number')
    .required(),
  email: yup.string().email().required(),
});

module.exports = async (req, res, next) => {
  try {
    await userSchema.validate(req.body);
    return next();
  } catch (err) {
    return res.status(400).json(err);
  }
};
