const Event = require('./Event')

module.exports = () => {
  Event.find({}).exec((err, users) => {
    if (err) {
      console.log(err)
    }

    if (users.length === 0) {
      let event = new Event()
      event.title = 'Cardistry Launch Party'
      event.description = 'Devin was lit.'
      event.location = "Bulgaria"
      event.save()

      console.log('events collection seeded')
    }
  })
}
