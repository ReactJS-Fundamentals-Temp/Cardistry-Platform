const users = require('../users/users-routes')
const flourishes = require('../flourishes/flourishes-routes')

module.exports = (app) => {
  app.use('/api/v1/users', users)
  app.use('/api/v1/flourishes', flourishes)
}
