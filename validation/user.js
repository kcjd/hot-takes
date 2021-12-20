const yup = require('yup');

const user = yup.object({
  password: yup.string().min(6).required(),
  email: yup.string().email().required(),
});

module.exports = user;
