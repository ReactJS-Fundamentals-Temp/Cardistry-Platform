const passport = require('passport')
const LocalStrategy = require('passport-local')
const JwtStrategy = require('passport-jwt').Strategy
const ExtractJwt = require('passport-jwt').ExtractJwt
const config = require('../config/config')
const User = require('../users/User')

const localOptions = {
  usernameField: 'email',
  passwordField: 'password'
}

const localLogin = new LocalStrategy(localOptions, (email, password, done) => {
  User.findOne({ email: email })
        .then((user, err, info) => {
          if (err) {
            return done(err)
          }

          if (!user) {
            return done(null, false)
          }

          user.comparePassword(password, function (err, isMatch) {
            if (err) {
              return done(err)
            }

            if (!isMatch) {
              return done(null, false)
            }

            return done(null, user)
          })
        })
})

const jwtOptions = {
  jwtFromRequest: ExtractJwt.fromAuthHeader('Authorization'),
  secretOrKey: config.jwtSecret
}

const jwtLogin = new JwtStrategy(jwtOptions, function (payload, done) {
  User.findOne({ _id: payload.sub })
        .then((user, err, info) => {
          if (err) {
            return done(err, false)
          }

          if (user) {
            done(null, user)
          } else {
            done(null, false)
          }
        })
})
module.exports = () => {
  passport.use(jwtLogin)
  passport.use(localLogin)
}
