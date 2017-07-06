const mongoose = require('mongoose')

const practiceSchema = mongoose.Schema({
  _creator: { type: mongoose.Schema.ObjectId, ref: 'User' },
  _type: { type: mongoose.Schema.ObjectId, ref: 'PracticeType' },
  _practice_list: { type: mongoose.Schema.ObjectId, ref: 'PracticeList' },
  overall_times_succeeded: { type: Number },
  overall_times_failed: { type: Number },
  step: { type: Number, default: 0 },
  completed: { type: Boolean, default: false },
  completedAt: { type: Date },
  repetitions: { type: Number }

}, { timestamps: true })

module.exports = mongoose.model('Practice', practiceSchema)
