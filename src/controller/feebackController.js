// reviewController.js
const Feedback = require('../model/ReviewModel');


const postFeedback = async (req, res) => {
  try {
    const { username, feedbackText } = req.body;
    const feedback = new Feedback({ username, feedbackText });
    await feedback.save();
    res.status(201).json({ message: 'Feedback posted successfully', feedback });
  } catch (error) {
    console.error('Error posting feedback:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

const getFeedback = async (req, res) => {
  try {
    const feedbackList = await Feedback.find().sort({ date: -1 });
    res.status(200).json(feedbackList);
  } catch (error) {
    console.error('Error retrieving feedback:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

module.exports = { postFeedback, getFeedback };
