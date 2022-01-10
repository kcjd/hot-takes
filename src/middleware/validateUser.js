const createError = require('http-errors')
const yup = require('yup')

const userSchema = yup.object({
  password: yup.string().min(8).required(),
  email: yup.string().email().required()
})

module.exports = async (req, res, next) => {
  try {
    await userSchema.validate(req.body)

    next()
  } catch (err) {
    next(createError.BadRequest(err.message))
  }
}
