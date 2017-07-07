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
  newTournament.contestant_limit = newTournamentData.participantCount
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

module.exports = {
  index,
  create,
  getUserTournaments,
  searchTournaments
}
