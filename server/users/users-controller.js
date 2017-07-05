const User = require('./User')
const jwt = require('jwt-simple')
const config = require('../config/config')

function register (req, res) {
  let newUserData = req.body

  if (!newUserData.username || !newUserData.email || !newUserData.password || !newUserData.confirmPassword) {
    let errors = []

    if (!newUserData.username) {
      errors.push({ message: 'The username is required.' })
    }

    if (!newUserData.email) {
      errors.push({ message: 'The email is required.' })
    }

    if (!newUserData.password) {
      errors.push({ message: 'The password is required.' })
    }

    if (!newUserData.confirmPassword) {
      errors.push({ message: 'The password confirmation is required.' })
    }

    req.session.errors = errors

    return res.redirect('/users/register')
  }

  if (newUserData.password === newUserData.confirmPassword) {
    let user = new User()
    user.username = newUserData.username
    user.email = newUserData.email
    user.password = user.encryptPassword(newUserData.password)
    user.save((err) => {
      if (err) {
        console.log(err, 'err')

        return res.status(422).json({error: err.message})
      }

      res.json({ token: tokenForUser(user) })
    })
  }
}

function signIn (req, res) {
  console.log(req.user, 'USER')
  res.json({ token: tokenForUser(req.user), user: req.user })
}

function logout (req, res) {
  req.logout()
  res.redirect('/')
}

function tokenForUser (user) {
  const payload = {
    sub: user._id
  }

  return jwt.encode(payload, config.jwtSecret)
}

function show (req, res) {
  const username = req.params.username

  User
    .findOne({username})
    .then(user => {
      res.json({success: true, message: 'Fetched User data successfully', user})
    })
}

module.exports = {
  register,
  logout,
  signIn,
  show
}
