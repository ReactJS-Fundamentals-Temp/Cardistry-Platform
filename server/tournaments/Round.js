const mongoose = require('mongoose')

const roundSchema = mongoose.Schema({
  _tournament: { type: mongoose.Schema.ObjectId, ref: 'Tournament' },
  contestants: [{type: mongoose.Schema.ObjectId, ref: 'User'}],
  round_number: {type: Number}
}, { timestamps: true })

module.exports = mongoose.model('Round', roundSchema)
