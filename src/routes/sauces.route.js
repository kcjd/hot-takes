const router = require('express').Router();
const { createSauce, updateSauce } = require('../controllers/sauces.controller');
const uploadImage = require('../middleware/uploadImage');

router.post('/', uploadImage, createSauce);
router.put('/:id', uploadImage, updateSauce);

module.exports = router;
