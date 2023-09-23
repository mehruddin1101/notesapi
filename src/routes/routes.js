const express= require("express")
const router =express.Router()
const {executePythonCode} = require("../controller/pythonController")
router.post("/python", executePythonCode)
module.exports=router