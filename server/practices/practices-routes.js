const express = require('express')
let router = express.Router()
const practicesController = require('./practices-controller')
const auth = require('../middlewares/auth')

router.post('', auth.requireAuth, (req, res) => {
  practicesController.createPractice(req, res)
})

router.get('/practice-lists', auth.requireAuth, (req, res) => {
  practicesController.getCurrentUserPracticeList(req, res)
})

router.post('/practice-lists', auth.requireAuth, (req, res) => {
  practicesController.createPracticeList(req, res)
})

router.get('/practice-types', (req, res) => {
  practicesController.getPracticeTypes(req, res)
})

module.exports = router
