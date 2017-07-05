const mongoose = require('mongoose')

const eventsSchema = mongoose.Schema({
  _creator: { type: mongoose.Schema.ObjectId, ref: 'User' },
  title: { type: String, unique: true },
  description: {type: String, required: true},
  location: {type: String}
}, { timestamps: true })

module.exports = mongoose.model('Event', eventsSchema)
