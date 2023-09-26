const mongoose = require('mongoose');

const feedbackSchema = new mongoose.Schema({
  username: String,
  feedbackText: String,
  date: { type: Date, default: Date.now },
});

const Feedback = mongoose.model('Feedback', feedbackSchema);

module.exports = Feedback;
