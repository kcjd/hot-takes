const yup = require('yup');

module.exports = yup.object({
  password: yup
    .string()
    .min(8)
    .matches(/.*[A-Z]/, 'password must contain one uppercase letter')
    .matches(/.*[0-9]/, 'password must contain one number')
    .required(),
  email: yup.string().email().required(),
});
