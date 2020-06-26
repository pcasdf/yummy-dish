const Review = require('../models/review');
const { isValidObjectId } = require('mongoose');
const review = require('../models/review');

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

const getUserReviews = async (req, res) => {
  try {
    const { id } = req.params;
    console.log(id);
    const reviews = await Review.find({ user: id });
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

const updateReview = async (req, res) => {
  const { id } = req.params
  await Review.findByIdAndUpdate(id, req.body, { new: true }, (error, review) => {
    if (error) {
      return res.status(500).json({ error: error.message });
    }
    if (!review) {
      return res.status(404).json({ message: 'Review not found' });
    }
    res.status(200).json(review);
  });
}

module.exports = {
  createReview,
  getReviews,
  getReview,
  getUserReviews,
  deleteReview,
  updateReview
};
