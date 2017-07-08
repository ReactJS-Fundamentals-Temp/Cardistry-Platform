const express = require('express')
let router = express.Router()
const tournametsController = require('./tournaments-controller')
const auth = require('../middlewares/auth')

router.get('', (req, res) => {
  console.log('TOURNAMENTS')
  tournametsController.index(req, res)
})

router.get('/:tournament', (req, res) => {
  console.log('TOURNAMENTS')
  tournametsController.getUserTournaments(req, res)
})

router.get('/tournament/search/:title', (req, res) => {
  tournametsController.searchTournaments(req, res)
})

router.put('/join/:id', auth.requireAuth, (req, res) => {
  console.log('kvo')
  tournametsController.joinTournament(req, res)
})

router.post('', auth.requireAuth, (req, res) => {
  tournametsController.create(req, res)
})

module.exports = router
