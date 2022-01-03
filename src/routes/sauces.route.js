const router = require('express').Router()
const saucesController = require('../controllers/sauces.controller')
const uploadImage = require('../middleware/uploadImage')

router.get('/', saucesController.getSauces)
router.get('/:id', saucesController.getSauce)
router.post('/', uploadImage, saucesController.createSauce)
router.put('/:id', uploadImage, saucesController.updateSauce)
router.delete('/:id', saucesController.deleteSauce)
router.post('/:id/like', saucesController.likeSauce)

module.exports = router
