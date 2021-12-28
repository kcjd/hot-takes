const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const createError = require('http-errors');
const User = require('../models/user.model');

exports.signup = async (req, res, next) => {
  const { email, password } = req.body;

  try {
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new User({ email, password: hashedPassword });
    await user.save();

    res.status(201).json({ message: 'user created successfully' });
  } catch (err) {
    next(err);
  }
};

exports.login = async (req, res, next) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) throw createError(401, 'user not found');

    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) throw createError(401, 'wrong password');

    const token = jwt.sign({ userId: user._id }, process.env.TOKEN_SECRET, { expiresIn: '24h' });

    res.status(200).json({ userId: user._id, token });
  } catch (err) {
    next(err);
  }
};
