const { Schema, model } = require('mongoose');

const Review = new Schema({
  recipe: { type: String, required: true },
  user: { type: Schema.Types.ObjectId, required: true }
});

module.exports = model('Review', Review);
