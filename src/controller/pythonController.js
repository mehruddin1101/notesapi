const { exec } = require('child_process');
const PythonModel = require('../model/model'); 

const executePythonCode = async (req, res) => {
  const { code } = req.body;
  exec(`/usr/bin/python3 -c "${code}"`, async (error, stdout, stderr) => {
    if (error) {
      // console.error('Error executing Python code:', error);
      return res.status(500).json({ error: 'Error executing Python code', output: stderr });
    }

    try {
      const pythonOutput = new PythonModel({
        code,
        output: stdout,
        errorOutput: stderr,
      });

      const savedOutput = await pythonOutput.save();

      // console.log('Python code executed successfully:', savedOutput);
      return res.status(200).json(savedOutput);
    } catch (saveError) {
      // console.error('Error saving Python output:', saveError);
      return res.status(500).json({ error: 'Error saving Python output to MongoDB' });
    }
  });
};


module.exports = {
  executePythonCode,
};
