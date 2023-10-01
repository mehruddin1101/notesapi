const { exec } = require('child_process');

const calculatePythonCyclomaticComplexity = (code) => {
  return new Promise((resolve, reject) => {
    const command = `radon cc -`; 

    const childProcess = exec(command, (error, stdout, stderr) => {
      if (error) {
        reject(error);
        return;
      }

      // Check for errors in stderr
      if (stderr) {
        reject(new Error(stderr));
        return;
      }

      resolve(stdout);
    });

    childProcess.stdin.write(code);
    childProcess.stdin.end();
  });
};

const measurePythonCyclomaticComplexity = async (req, res) => {
  const code = req.body.code;

  try {
    const complexityResult = await calculatePythonCyclomaticComplexity(code);
    res.json({ cyclomaticComplexity: complexityResult });
  } catch (error) {
    console.error('Error calculating cyclomatic complexity for Python code:', error);
    res.status(500).json({ error: 'Error calculating cyclomatic complexity for Python code' });
  }
};

module.exports = {
  measurePythonCyclomaticComplexity
};
