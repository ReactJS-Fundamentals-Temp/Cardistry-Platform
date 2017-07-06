const mongoose = require('mongoose')

const practiceTypeSchema = mongoose.Schema({
  name: { type: String }
}, { timestamps: true })

module.exports = mongoose.model('PracticeType', practiceTypeSchema)
