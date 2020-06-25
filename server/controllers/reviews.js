const Review = require('../models/review');
const { isValidObjectId } = require('mongoose');

const createReview = async (req, res) => {
  try {
    const review = new Review(req.body);
    await review.save();
    res.status(201).json(review);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getReviews = async (req, res) => {
  try {
    const { id } = req.params;
    console.log(id);
    const reviews = await Review.find({ recipe: id });
    res.status(201).json(reviews);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getReview = async (req, res) => {
  try {
    const { id } = req.params;
    let review;
    if (isValidObjectId(id)) {
      review = await Review.findById(id);
      res.json(review);
    }
    res.status(404).json({ message: 'Could not find user.' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const deleteReview = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await Review.findByIdAndDelete(id);
    if (deleted) {
      return res.status(200).send('Review deleted!');
    }
    res.status(404).json({ message: 'Could not find user.' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  createReview,
  getReviews,
  getReview,
  deleteReview
};
