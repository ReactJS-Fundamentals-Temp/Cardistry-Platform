const mongoose = require('mongoose')
const deepPopulate = require('mongoose-deep-populate')(mongoose)

const practiceSchema = mongoose.Schema({
  _creator: { type: mongoose.Schema.ObjectId, ref: 'User' },
  _type: { type: mongoose.Schema.ObjectId, ref: 'PracticeType' },
  _practice_list: { type: mongoose.Schema.ObjectId, ref: 'PracticeList' },
  total_successes: { type: Number, default: 0 },
  total_fails: { type: Number, default: 0 },
  step: { type: Number, default: 0 },
  completed: { type: Boolean, default: false },
  completedAt: { type: Date },
  required_consistency_repetitions: { type: Number }

}, { timestamps: true })

practiceSchema.plugin(deepPopulate, {})

module.exports = mongoose.model('Practice', practiceSchema)
