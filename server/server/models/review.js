const { Schema, model } = require('mongoose');

const Review = new Schema({
  recipe: { type: String, required: true },
  user: { type: Schema.Types.ObjectId, required: true },
  rating: { type: Number, required: true },
  comment: { type: String },
  fullName: { type: String }
});

module.exports = model('Review', Review);
