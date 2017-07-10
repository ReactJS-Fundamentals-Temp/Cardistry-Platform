const Tournament = require('./Tournament')
const User = require('../users/User')

function index (req, res) {
  Tournament
    .find({})
    .sort({'createdAt': -1})
    .then(tournaments => {
      console.log(tournaments, 'express tournaments')
      res.json({ success: true, message: 'Fetched tournaments successfully.', tournaments: tournaments })
    })
}

function create (req, res) {
  let currentUser = req.user
  let newTournamentData = req.body

  let newTournament = new Tournament()
  newTournament._creator = currentUser._id
  newTournament.title = newTournamentData.title
  newTournament.description = newTournamentData.description
  newTournament.participants_limit = newTournamentData.participantsLimit
  newTournament.contestants_limit = newTournamentData.contestantsLimit
  newTournament.rounds_count = newTournamentData.roundsCount
  newTournament.prize = newTournamentData.prize
  newTournament.save()

  if (req.files) {
    console.log(req.files)
  }

  res.json({success: true, message: 'Tournament created successfully'})
}

function getUserTournaments (req, res) {
  let username = req.params.username

  User
    .findOne({username})
    .then(user => {
      Tournament
        .find({_creator: user._id})
        .sort({'createdAt': -1})
        .then(tournaments => {
          console.log(tournaments, 'express tournaments')
          res.json({ success: true, message: '', tournaments: tournaments })
        })
    })
}

function searchTournaments (req, res) {
  const title = req.params.title

  Tournament
    .find({title})
    .sort({'createdAt': -1})
    .then(tournaments => {
      console.log(tournaments)
      res.json({ success: true, message: 'Tournaments found successfully', tournaments: tournaments })
    })
}

function joinTournament (req, res) {
  let currentUser = req.user
  let tournamentId = req.params.id

  Tournament
    .findById(tournamentId)
    .then(tournament => {
      tournament.participants.push(currentUser._id)
      tournament.save()
      res.json({ success: true, message: 'User joined tournament successfully' })
    })
}

module.exports = {
  index,
  create,
  getUserTournaments,
  searchTournaments,
  joinTournament
}
