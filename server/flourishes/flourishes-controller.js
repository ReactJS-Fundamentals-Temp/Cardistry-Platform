const Flourish = require('./Flourish')

function index (req, res) {
  Flourish
    .find({})
    .then(flourishes => {
      console.log(flourishes, 'express flourishes')
      res.json({ flourishes: flourishes })
    })
}

function create (req, res) {

}

module.exports = {
  index,
  create
}
