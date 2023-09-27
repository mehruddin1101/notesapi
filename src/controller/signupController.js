const User = require('../model/userSchema');
const bcrypt = require('bcrypt');
const nodemailer = require('nodemailer');
const ejs = require('ejs');
const path = require('path');
require('dotenv').config();

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

    // Send email to the user
    await sendSignupEmail(email);

    res.status(201).json({ statusText: 'Signup successful' });
  } catch (error) {
    console.error('Signup Error:', error);
    res.status(500).json({ statusText: 'Internal server error' });
  }
};

const sendSignupEmail = async (toEmail) => {
  try {
    const transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 465,
      secure: true,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    // Render HTML content from the EJS template
    const htmlContent = await ejs.renderFile(path.join(__dirname, 'emailTemplate.ejs'));

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: toEmail,
      subject: 'Welcome to Online Tools App',
      html: htmlContent,
    };

    await transporter.sendMail(mailOptions);

    console.log('Signup email sent successfully');
  } catch (error) {
    console.error('Error sending signup email:', error);
    throw error; 
  }
};
module.exports = {
  SignupController,
};
