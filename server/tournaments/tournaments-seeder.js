const Tournament = require('./Tournament')

module.exports = () => {
  Tournament.find({}).exec((err, tournaments) => {
    if (err) {
      console.log(err)
    }

    if (tournaments.length === 0) {
      let tournament = new Tournament()
      tournament.title = 'Launch Tournament'
      tournament.description = 'Cardistry first tournament in the world '
      tournament.save()

      console.log('tournaments collection seeded')
    }
  })
}
