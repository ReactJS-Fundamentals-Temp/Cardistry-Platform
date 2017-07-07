const usersCollectionSeeder = require('../users/users-seeder')
const flourishesCollectionSeeder = require('../flourishes/flourishes-seeder')
const tournamentsCollectionSeeder = require('../tournaments/tournaments-seeder')
const eventsCollectionSeeder = require('../events/events-seeder')
const practicesCollectionSeeder = require('../practices/practices-seeder')

module.exports = () => {
  usersCollectionSeeder()
  flourishesCollectionSeeder()
  tournamentsCollectionSeeder()
  eventsCollectionSeeder()
  practicesCollectionSeeder()
}
