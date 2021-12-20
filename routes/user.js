const express = require('express');
const userCtrl = require('../controllers/user');
const validate = require('../middleware/validate');
const userSchema = require('../validation/user');

const router = express.Router();

router.post('/signup', validate(userSchema), userCtrl.signup);

module.exports = router;
