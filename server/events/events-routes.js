const express = require('express')
let router = express.Router()
const eventsController = require('./events-controller')
const auth = require('../middlewares/auth')

router.get('', (req, res) => {
  console.log('EVENTS')
  eventsController.index(req, res)
})

router.post('', auth.requireAuth, (req, res) => {
  eventsController.create(req, res)
})

module.exports = router
