const { exec } = require('child_process');

// Function to calculate cyclomatic complexity using cppcheck
const calculateCppCyclomaticComplexity = (cppCode) => {
  return new Promise((resolve, reject) => {
    const command = `cppcheck --enable=style --xml -`;

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

      // Parse the XML output to extract cyclomatic complexity
      const complexityRegex = /<complexity>(\d+)<\/complexity>/;
      const match = stdout.match(complexityRegex);

      if (match && match[1]) {
        resolve(parseInt(match[1]));
      } else {
        reject(new Error('Cyclomatic complexity not found in cppcheck output.'));
      }
    });

    childProcess.stdin.write(cppCode);
    childProcess.stdin.end();
  });
};

// Express route handler to calculate cyclomatic complexity for C++ code
const measureCppCyclomaticComplexity = (req, res) => {
  const cppCode = req.body.code;

  try {
    calculateCppCyclomaticComplexity(cppCode)
      .then((cyclomaticComplexity) => {
        res.json({ cyclomaticComplexity });
      })
      .catch((error) => {
        console.error('Error calculating cyclomatic complexity for C++ code:', error);
        res.status(500).json({ error: 'Error calculating cyclomatic complexity for C++ code' });
      });
  } catch (error) {
    console.error('Error calculating cyclomatic complexity for C++ code:', error);
    res.status(500).json({ error: 'Error calculating cyclomatic complexity for C++ code' });
  }
};

module.exports = {
  measureCppCyclomaticComplexity
};
