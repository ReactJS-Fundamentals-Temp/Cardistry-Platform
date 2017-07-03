const mongoose = require('mongoose')

let imageSchema = mongoose.Schema({
  img_path: String
})

const flourishSchema = mongoose.Schema({
  _creator: { type: mongoose.Schema.ObjectId, ref: 'User' },
  title: { type: String, unique: true },
  description: {type: String, required: true},
  video_path: {type: String, required: true},
  thumbnail: String,
  images: [imageSchema]
})

module.exports = mongoose.model('Flourish', flourishSchema)
