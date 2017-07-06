const express = require('express')
let router = express.Router()
const practicesController = require('./practices-controller')
const auth = require('../middlewares/auth')

router.get('/practice-lists', auth.requireAuth, (req, res) => {
  practicesController.getCurrentUserPracticeList(req, res)
})

router.post('/practice-lists', auth.requireAuth, (req, res) => {
  practicesController.createPracticeList(req, res)
})

module.exports = router
