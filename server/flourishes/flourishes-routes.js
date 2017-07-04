const express = require('express')
let router = express.Router()
const flourishesController = require('./flourishes-controller')
const auth = require('../middlewares/auth')

router.get('', (req, res) => {
  console.log('FLOURISHES')
  flourishesController.index(req, res)
})

router.post('', (req, res) => {
  console.log('ADD FLOURISH')
  flourishesController.create(req, res)
})

module.exports = router
