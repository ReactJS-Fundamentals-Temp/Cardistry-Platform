const express = require('express')
let router = express.Router()
const flourishesController = require('./flourishes-controller')
const auth = require('../middlewares/auth')

router.get('', (req, res) => {
  console.log('FLOURISHES')
  flourishesController.index(req, res)
})

router.get('/:username', (req, res) => {
  console.log('FLOURISHES')
  flourishesController.getUserFlourishes(req, res)
})

router.post('', auth.requireAuth, (req, res) => {
  flourishesController.create(req, res)
})

module.exports = router
