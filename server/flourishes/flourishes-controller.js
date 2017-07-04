const Flourish = require('./Flourish')
const User = require('../users/User')

function index (req, res) {
  Flourish
    .find({})
    .sort({'createdAt': -1})
    .then(flourishes => {
      console.log(flourishes, 'express flourishes')
      res.json({ success: true, message: '', flourishes: flourishes })
    })
}

function create (req, res) {
  let currentUser = req.user
  let newFlourishData = req.body

  let newFlourish = new Flourish()
  newFlourish._creator = currentUser._id
  newFlourish.title = newFlourishData.title
  newFlourish.description = newFlourishData.description
  newFlourish.save()

  if (req.files) {
    console.log(req.files)
  }

  res.json({success: true, message: 'Flourish created successfully'})
}

function getUserFlourishes (req, res) {
  let username = req.params.username

  User
    .findOne({username})
    .then(user => {
      Flourish
        .find({_creator: user._id})
        .sort({'createdAt': -1})
        .then(flourishes => {
          console.log(flourishes, 'express flourishes')
          res.json({ success: true, message: '', flourishes: flourishes })
        })
    })
}

module.exports = {
  index,
  create,
  getUserFlourishes
}
