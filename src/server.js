const express = require('express');
const bodyParser = require('body-parser');
const connect = require('./database/connect');
const router = require('./routes/routes');
const cors = require('cors'); // Import the cors middleware

const app = express();
const port = process.env.PORT || 3001;

connect();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Use the cors middleware to enable CORS
app.use(cors());

app.use("/api/compiler", router);
app.use("/api/timecomplexity", router)



app.listen(port, () => {
  console.log(`App is listening on port http://localhost:${port}`);
});
