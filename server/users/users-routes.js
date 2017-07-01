const express = require('express')
let router = express.Router()
const usersController = require('./users-controller')
const auth = require('../middlewares/auth')

router.post('/register', auth.isGuest, (req, res) => {
  console.log('REGISTER NOW')
  usersController.register(req, res)
})

router.post('/login', auth.isGuest, (req, res) => {
  usersController.login(req, res)
})

router.post('/logout', (req, res) => {
  usersController.logout(req, res)
})

// Test
router.get('/auth', auth.requireAuth, (req, res) => {
  res.json({hi: 'hi'})
})

// Test
router.post('/signin', auth.requireSignIn, (req, res) => {
  usersController.signIn(req, res)
})

module.exports = router
