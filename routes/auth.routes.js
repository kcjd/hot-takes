const router = require('express').Router();
const { signup, login } = require('../controllers/auth.controller');
const validateUser = require('../middleware/validateUser');

router.post('/signup', validateUser(), signup);
router.post('/login', login);

module.exports = router;
