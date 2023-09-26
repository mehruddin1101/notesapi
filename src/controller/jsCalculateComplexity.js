const escomplex = require('escomplex');

const timecomplexity = (req, res) => {
    const code = req.body.code;
    const complexity = calculateCodeComplexity(code);
  
    res.json({ complexity });
  }


function calculateCodeComplexity(code) {
    try {
      const report = escomplex.analyse(code, {
        parser: {
          sourceType: 'module' // or 'script' depending on your use case
        }
      });
      const cyclomaticComplexity = report.aggregate.cyclomatic;
  
      return cyclomaticComplexity;
    } catch (error) {
      console.error('Error calculating complexity:', error);
      return -1; // Return an error code or message
    }
  }
  module.exports={
    timecomplexity
  }