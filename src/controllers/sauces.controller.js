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
    if (!sauce) throw createError.NotFound()

    res.status(200).json(sauce)
  } catch (err) {
    next(err)
  }
}

exports.createSauce = async (req, res, next) => {
  const { userId } = req

  try {
    const data = {
      ...JSON.parse(req.body.sauce),
      imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`,
      userId
    }

    const sauce = new Sauce(data)
    await sauce.save()

    res.status(200).send({ message: 'sauce created successfully' })
  } catch (err) {
    if (req.file) await fs.unlink(req.file.path)
    next(err)
  }
}

exports.updateSauce = async (req, res, next) => {
  const { id } = req.params
  const { userId } = req

  try {
    const data = req.file
      ? {
          ...JSON.parse(req.body.sauce),
          imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
        }
      : req.body

    const sauce = await Sauce.findById(id)
    if (!sauce) throw createError.NotFound()

    if (sauce.userId !== userId) throw createError.Forbidden()

    await sauce.updateOne(data, { runValidators: true })

    if (req.file) {
      await fs.unlink(`public/images/${sauce.imageUrl.split('/').pop()}`)
    }

    res.status(200).send({ message: 'sauce updated successfully' })
  } catch (err) {
    if (req.file) await fs.unlink(req.file.path)
    next(err)
  }
}

exports.deleteSauce = async (req, res, next) => {
  const { id } = req.params
  const { userId } = req

  try {
    const sauce = await Sauce.findById(id)
    if (!sauce) throw createError.NotFound()

    if (sauce.userId !== userId) throw createError.Forbidden()

    await sauce.deleteOne()

    await fs.unlink(`public/images/${sauce.imageUrl.split('/').pop()}`)

    res.status(200).json('sauce deleted successfully')
  } catch (err) {
    next(err)
  }
}

exports.likeSauce = async (req, res, next) => {
  const { id } = req.params
  const { userId } = req
  const { like } = req.body

  try {
    const sauce = await Sauce.findById(id)
    if (!sauce) throw createError.NotFound()

    let { usersLiked, usersDisliked } = sauce

    switch (like) {
      case 1:
        usersLiked = usersLiked.includes(userId) ? usersLiked : [...usersLiked, userId]
        usersDisliked = usersDisliked.filter((x) => x !== userId)
        break
      case -1:
        usersDisliked = usersDisliked.includes(userId) ? usersDisliked : [...usersDisliked, userId]
        usersLiked = usersLiked.filter((x) => x !== userId)
        break
      case 0:
        usersLiked = usersLiked.filter((x) => x !== userId)
        usersDisliked = usersDisliked.filter((x) => x !== userId)
        break
      default:
        throw createError.BadRequest()
    }

    const likes = usersLiked.length
    const dislikes = usersDisliked.length

    await sauce.updateOne({ usersLiked, usersDisliked, likes, dislikes })

    res.status(200).send({ message: 'sauce liked / disliked successfully' })
  } catch (err) {
    next(err)
  }
}
