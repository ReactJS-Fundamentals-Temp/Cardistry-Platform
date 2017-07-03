// const mongoose = require('mongoose')
const User = require('./User')

module.exports = () => {
  User.find({}).exec((err, users) => {
    if (err) {
      console.log(err)
    } else {
      if (users.length === 0) {
        let adminUser = new User()
        adminUser.username = 'admin'
        adminUser.email = 'admin@cardistry.com'
        adminUser.password = adminUser.encryptPassword('admin')
        adminUser.roles = ['Admin']
        adminUser.save()

        console.log('users collection seeded')
      }
    }
  })
}
