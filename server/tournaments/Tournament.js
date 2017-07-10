const mongoose = require('mongoose')

const tournamentSchema = mongoose.Schema({
  _creator: { type: mongoose.Schema.ObjectId, ref: 'User' },
  title: { type: String, unique: true },
  description: {type: String, required: true},
  participants: [ {type: mongoose.Schema.ObjectId, ref: 'User'} ],
  participants_limit: {type: Number},
  contestants_limit: {type: Number},
  rounds: [{type: mongoose.Schema.ObjectId, ref: 'Round'}],
  rounds_count: {type: Number},
  prize: {type: String}
}, { timestamps: true })

module.exports = mongoose.model('Tournament', tournamentSchema)
