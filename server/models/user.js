const { Schema, model } = require('mongoose')

const User = Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  fullName: { type: String, required: true },
  avatar: { type: String },
  recipes: [{type: Schema.Types.ObjectId, ref: 'recipe', required: true}]

})

module.exports = model('User', User)