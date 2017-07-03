const usersCollectionSeeder = require('../users/users-seeder')
const flourishesCollectionSeeder = require('../flourishes/flourishes-seeder')

module.exports = () => {
  usersCollectionSeeder()
  flourishesCollectionSeeder()
}
