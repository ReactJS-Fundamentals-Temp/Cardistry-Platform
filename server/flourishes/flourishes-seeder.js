const Flourish = require('./Flourish')

module.exports = () => {
  Flourish.find({}).exec((err, flourishes) => {
    if (err) {
      console.log(err)
    }

    if (flourishes.length === 0) {
      let sybil = new Flourish()
      sybil.title = 'Sybil'
      sybil.description = 'Sybil is one of the classics.'
      sybil.video_path = 'sybil-flourish.mp4'
      sybil.thumbnail = 'sybil-1.png'
      sybil.save()

      let veryBadHabit = new Flourish()
      veryBadHabit.title = 'Very Bad Habit'
      veryBadHabit.description = 'Very Bad Habit is one of the classics.'
      veryBadHabit.save()

      console.log('flourishes collection seeded')
    }
  })
}
