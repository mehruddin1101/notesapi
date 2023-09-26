const User = require('../model/userSchema');
const bcrypt = require('bcrypt');

const SignupController = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(409).json({ statusText: 'Email already in use' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      username,
      email,
      password: hashedPassword,
    });

    await newUser.save();

    res.status(201).json({ statusText: 'Signup successful' });
  } catch (error) {
    console.error('Signup Error:', error);
    res.status(500).json({ statusText: 'Internal server error' });
  }
};

module.exports = {
  SignupController,
};
