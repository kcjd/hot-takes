const router = require('express').Router()
const authController = require('../controllers/auth.controller')
const validateUser = require('../middleware/validateUser')

router.post('/signup', validateUser, authController.signup)
router.post('/login', authController.login)

module.exports = router
