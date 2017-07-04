const Flourish = require('./Flourish')

function index (req, res) {
  Flourish
    .find({})
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

module.exports = {
  index,
  create
}
