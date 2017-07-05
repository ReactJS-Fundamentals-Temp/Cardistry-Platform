const usersCollectionSeeder = require('../users/users-seeder')
const flourishesCollectionSeeder = require('../flourishes/flourishes-seeder')
const eventsCollectionSeeder = require('../events/events-seeder')

module.exports = () => {
  usersCollectionSeeder()
  flourishesCollectionSeeder()
  eventsCollectionSeeder()
}
