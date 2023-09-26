const User = require('../model/userSchema');
const bcrypt = require('bcrypt');

const LoginController = async (req, res) => {
  try {
    const { email, password } = req.body;

  
    const user = await User.findOne({ email });

    
    if (!user) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    res.status(200).json({ message: 'Login successful', user:user });
  } catch (error) {
    console.error('Login Error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

module.exports = {
  LoginController,
};
