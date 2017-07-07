const mongoose = require('mongoose')

let imageSchema = mongoose.Schema({
  img_path: String
})

const tournamentSchema = mongoose.Schema({
  _creator: { type: mongoose.Schema.ObjectId, ref: 'User' },
  title: { type: String, unique: true },
  description: {type: String, required: true},
  contestant_limit: {type: Number, required: true},
  rounds_count: {type: Number, required: true},
  prize: {type: String, required: true}
}, { timestamps: true })

module.exports = mongoose.model('Tournament', tournamentSchema)
