const bcrypt = require('bcrypt');
const User = require('../models/user');

exports.signup = async (req, res) => {
  try {
    const { email, password } = req.body;

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ email, password: hashedPassword });

    await user.save();
    res.status(201).json({ message: 'user created successfully' });
  } catch (err) {
    res.status(500).json(err);
  }
};
