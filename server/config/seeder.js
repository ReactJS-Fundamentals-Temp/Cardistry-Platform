const usersCollectionSeeder = require('../users/users-seeder')
const flourishesCollectionSeeder = require('../flourishes/flourishes-seeder')
const eventsCollectionSeeder = require('../events/events-seeder')
const practicesCollectionSeeder = require('../practices/practices-seeder')

module.exports = () => {
  usersCollectionSeeder()
  flourishesCollectionSeeder()
  eventsCollectionSeeder()
  practicesCollectionSeeder()
}
