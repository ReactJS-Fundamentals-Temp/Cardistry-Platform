const Event = require('./Event')
const User = require('../users/User')

function index (req, res) {
  Event
    .find({})
    .sort({'createdAt': -1})
    .then(events => {
      console.log(events, 'express events')
      res.json({ success: true, message: '', events: events })
    })
}

function create (req, res) {
  let currentUser = req.user
  let newEventData = req.body

  let newEvent = new Event()
  newEvent._creator = currentUser._id
  newEvent.title = newEventData.title
  newEvent.description = newEventData.description
  newEvent.location = newEventData.location
  newEvent.save()

  if (req.files) {
    console.log(req.files)
  }

  res.json({success: true, message: 'Event created successfully'})
}

module.exports = {
  index,
  create
}
