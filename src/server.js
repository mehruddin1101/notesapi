const express = require('express');
const bodyParser = require('body-parser');
const connect = require('./database/connect');
const router = require('./routes/routes');
const SingupRouter= require("./routes/AuthRouter");
const  FeebBackRouter = require("./routes/FeebBackRouter")

const cors = require('cors'); 
const app = express();
const port = process.env.PORT || 3001;
connect();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());

// controllers 
app.use("/api/compiler", router);
app.use("/api/timecomplexity", router)
app.use("/api/Auth",SingupRouter)
app.use("/api/feedback",FeebBackRouter)

app.listen(port, () => {
  console.log(`App is listening on port http://localhost:${port}`);
});
