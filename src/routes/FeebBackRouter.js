const express = require('express');
const FeebBackRouter = express.Router();
const { postFeedback, getFeedback  }  = require('../controller/feebackController')
FeebBackRouter.post("/post",postFeedback )
FeebBackRouter.get("/get",getFeedback)

module.exports = FeebBackRouter;