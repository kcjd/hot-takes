const router = require('express').Router();
const { signup, login } = require('../controllers/auth');
const validate = require('../middleware/validate');
const userSchema = require('../validation/user');

router.post('/signup', validate(userSchema), signup);
router.post('/login', login);

module.exports = router;
