const express = require('express');
const router = express.Router();
const { executePythonCode } = require('../controller/pythonController');
const { timecomplexity } = require('../controller/jsCalculateComplexity');
// const { measurePythonCyclomaticComplexity } = require('../controller/pyController');
const {measureJavaCyclomaticComplexity} = require('../controller/javaComplexity')
// const {measureCppCyclomaticComplexity} =require("../controller/cppComplexity")
router.post('/executepython', executePythonCode);
router.post('/javascript', timecomplexity);
// router.post('/python',measurePythonCyclomaticComplexity);
router.post('/java',measureJavaCyclomaticComplexity);
// router.post('/cpp',measureCppCyclomaticComplexity)

module.exports = router;
