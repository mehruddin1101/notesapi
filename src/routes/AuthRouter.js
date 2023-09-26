const express = require('express');
const { route } = require('./routes');
const SingupRouter = express.Router();
const {LoginController}= require('../controller/loginController')
const {SignupController} = require("../controller/signupController")
SingupRouter.post("/login", LoginController)
SingupRouter.post("/signup", SignupController)
module.exports = SingupRouter;
