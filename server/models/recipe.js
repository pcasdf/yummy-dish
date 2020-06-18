const { Schema, model } = require('mongoose');

const Recipe = Schema({
  user: { type: Schema.Types.ObjectId, ref: 'user', required: true },
  favorites: [{ type: Object, required: true }]
});

module.exports = model("Recipe", Recipe)
