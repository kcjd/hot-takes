const fs = require('fs/promises')
const createError = require('http-errors')
const Sauce = require('../models/sauce.model')

exports.getSauces = async (req, res, next) => {
  try {
    const sauces = await Sauce.find()

    res.status(200).json(sauces)
  } catch (err) {
    next(err)
  }
}

exports.getSauce = async (req, res, next) => {
  const { id } = req.params

  try {
    const sauce = await Sauce.findById(id)
    if (!sauce) throw createError(404, 'sauce not found')

    res.status(200).json(sauce)
  } catch (err) {
    next(err)
  }
}

exports.createSauce = async (req, res, next) => {
  try {
    const sauce = new Sauce({
      ...JSON.parse(req.body.sauce),
      imageUrl: `${req.protocol}://${req.get('host')}/${req.file.path}`
    })
    await sauce.save()

    res.status(200).send({ message: 'sauce created successfully' })
  } catch (err) {
    await fs.unlink(req.file.path)
    next(err)
  }
}

exports.updateSauce = async (req, res, next) => {
  const { id } = req.params

  try {
    const sauce = await Sauce.findById(id)
    if (!sauce) throw createError(404, 'sauce not found')

    await sauce.updateOne(
      req.file
        ? {
            ...JSON.parse(req.body.sauce),
            imageUrl: `${req.protocol}://${req.get('host')}/${req.file.path}`
          }
        : req.body,
      { runValidators: true }
    )

    await fs.unlink(`public/images/${sauce.imageUrl.split('/').pop()}`)

    res.status(200).send({ message: 'sauce updated successfully' })
  } catch (err) {
    if (req.file) await fs.unlink(req.file.path)
    next(err)
  }
}
