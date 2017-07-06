const express = require('express')
let router = express.Router()
const practicesController = require('./practices-controller')
const auth = require('../middlewares/auth')

router.post('', auth.requireAuth, (req, res) => {
  practicesController.createPracticeList(req, res)
})

module.exports = router
