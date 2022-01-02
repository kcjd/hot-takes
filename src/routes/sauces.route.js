const router = require('express').Router()
const { getSauces, getSauce, createSauce, updateSauce, deleteSauce } = require('../controllers/sauces.controller')
const uploadImage = require('../middleware/uploadImage')

router.get('/', getSauces)
router.get('/:id', getSauce)
router.post('/', uploadImage, createSauce)
router.put('/:id', uploadImage, updateSauce)
router.delete('/:id', deleteSauce)

module.exports = router
