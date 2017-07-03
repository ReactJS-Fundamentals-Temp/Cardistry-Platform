const Flourish = require('./Flourish')

module.exports = () => {
  Flourish.find({}).exec((err, users) => {
    if (err) {
      console.log(err)
    }

    if (users.length === 0) {
      let flourish = new Flourish()
      flourish.title = 'Sybil'
      flourish.description = 'Sybil is one of the classics.'
      flourish.video_path = 'sybil-flourish.mp4'
      flourish.thumbnail = 'sybil-1.png'
      flourish.save()

      console.log('flourishes collection seeded')
    }
  })
}
