const mongoose = require('mongoose');

const pythonSchema = new mongoose.Schema({
  code: String,
  output: String,
});

module.exports = mongoose.model('model', pythonSchema);
