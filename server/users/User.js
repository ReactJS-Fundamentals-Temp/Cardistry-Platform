const mongoose = require('mongoose')
const bcrypt = require('bcrypt-nodejs')
let userSchema = mongoose.Schema({
  email: { type: String, unique: true },
  username: {type: String, required: true, unique: true},
  password: { type: String },
  roles: { type: [String], default: ['Cardist'] }
}, { timestamps: true })

userSchema.methods.encryptPassword = (password) => {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(5), null)
}

userSchema.methods.validPassword = (attemptPassword, hashedUserPassword) => {
  return bcrypt.compareSync(attemptPassword, hashedUserPassword)
}

userSchema.methods.comparePassword = function (candidatePassword, callback) {
  bcrypt.compare(candidatePassword, this.password, function (err, isMatch) {
    if (err) {
      return callback(err)
    }

    callback(null, isMatch)
  })
}

module.exports = mongoose.model('User', userSchema)
