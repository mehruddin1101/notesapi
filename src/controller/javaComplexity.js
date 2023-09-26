const parser = require('java-parser');
const fs = require('fs');

// Function to calculate cyclomatic complexity
const calculateJavaCyclomaticComplexity = (javaCode) => {
  try {
    const ast = parser.parse(javaCode);
    let complexity = 1; // Initialize with 1 for the default path

    // Visit the abstract syntax tree to calculate complexity
    const visitAST = (node) => {
      if (node.type === 'IfStatement' || node.type === 'WhileStatement' || node.type === 'ForStatement' || node.type === 'SwitchStatement') {
        complexity++;
      }
      for (const key in node) {
        if (node[key] && typeof node[key] === 'object') {
          visitAST(node[key]);
        }
      }
    };

    visitAST(ast);

    return complexity;
  } catch (error) {
    throw error;
  }
};

// Express route handler to calculate cyclomatic complexity
const measureJavaCyclomaticComplexity = (req, res) => {
  const javaCode = req.body.code;

  try {
    const complexity = calculateJavaCyclomaticComplexity(javaCode);
    res.json({ complexity });
  } catch (error) {
    console.error('Error calculating cyclomatic complexity for Java code:', error);
    res.status(500).json({ error: 'Error calculating cyclomatic complexity for Java code' });
  }
};

module.exports = {
  measureJavaCyclomaticComplexity
};
