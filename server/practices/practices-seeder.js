const PracticeType = require('./PracticeType')

module.exports = () => {
  PracticeType.find({}).exec((err, practices) => {
    if (err) {
      console.log(err)
    }

    if (practices.length === 0) {
      let consistency = new PracticeType()
      consistency.name = 'Consistency'
      consistency.save()

      let speed = new PracticeType()
      speed.name = 'Speed'
      speed.save()

      let flow = new PracticeType()
      flow.name = 'Flow'
      flow.save()

      console.log('practice types collection seeded')
    }
  })
}
