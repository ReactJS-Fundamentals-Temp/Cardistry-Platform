const mongoose = require('mongoose')

const practiceSchema = mongoose.Schema({
  _creator: { type: mongoose.Schema.ObjectId, ref: 'User' },
  _type: { type: mongoose.Schema.ObjectId, ref: 'PracticeType' },
  _practice_list: { type: mongoose.Schema.ObjectId, ref: 'PracticeList' },
  times_succeeded: { type: Number, default: 0 },
  times_failed: { type: Number, default: 0 },
  step: { type: Number, default: 0 },
  completed: { type: Boolean, default: false },
  completedAt: { type: Date },
  required_consistency_repetitions: { type: Number }

}, { timestamps: true })

module.exports = mongoose.model('Practice', practiceSchema)
