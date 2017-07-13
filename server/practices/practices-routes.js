const express = require('express')
let router = express.Router()
const practicesController = require('./practices-controller')
const auth = require('../middlewares/auth')

router.get('/current-practice/:id', auth.requireAuth, (req, res) => {
  practicesController.getPractice(req, res)
})

router.put('/current-practice/:id/complete-step', auth.requireAuth, (req, res) => {
  practicesController.completeStep(req, res)
})

router.put('/current-practice/:id/complete-practice', auth.requireAuth, (req, res) => {
  practicesController.completePractice(req, res)
})

router.get('', auth.requireAuth, (req, res) => {
  practicesController.index(req, res)
})

router.get('/user', auth.requireAuth, (req, res) => {
  practicesController.getCurrentUserPractices(req, res)
})

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
