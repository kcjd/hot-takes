const router = require('express').Router()
const saucesController = require('../controllers/sauces.controller')
const upload = require('../middleware/upload')

router.get('/', saucesController.getSauces)
router.get('/:id', saucesController.getSauce)
router.post('/', upload.single('image'), saucesController.createSauce)
router.put('/:id', upload.single('image'), saucesController.updateSauce)
router.delete('/:id', saucesController.deleteSauce)
router.post('/:id/like', saucesController.likeSauce)

module.exports = router
