const express= require("express")
const router =express.Router()
const {executePythonCode} = require("../controller/pythonController")
const {timecomplexity} =require("../controller/jsCalculateComplexity")
router.post("/python", executePythonCode)
router.post('/calculate-complexity', timecomplexity);
module.exports=router