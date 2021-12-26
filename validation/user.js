const yup = require('yup');

module.exports = yup.object({
  password: yup.string().min(6).required(),
  email: yup.string().email().required(),
});
