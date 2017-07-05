const mongoose = require('mongoose')

const practiceListsSchema = mongoose.Schema({
  _creator: { type: mongoose.Schema.ObjectId, ref: 'User' },
  title: String,
  flourishes: [{ type: mongoose.Schema.ObjectId, ref: 'Flourish' }],
  times_practiced: { type: Number }
}, { timestamps: true })

module.exports = mongoose.model('PracticeList', practiceListsSchema)
