const express = require('express');
const bodyParser = require('body-parser');
const connect = require('./database/connect');
const router = require('./routes/routes');
const cors = require('cors'); // Import the cors middleware
const escomplex = require('escomplex');

const app = express();
const port = process.env.PORT || 3001;

connect();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Use the cors middleware to enable CORS
app.use(cors());

app.use("/api/compiler", router);

app.post('/calculate-complexity', (req, res) => {
  const code = req.body.code;
  const complexity = calculateCodeComplexity(code);

  res.json({ complexity });
});

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

app.listen(port, () => {
  console.log(`App is listening on port http://localhost:${port}`);
});
