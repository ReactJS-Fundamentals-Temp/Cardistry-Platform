const path = require('path')
const rootPath = path.normalize(path.join(__dirname, '../../'))
const databaseName = 'express-react-redux'

module.exports = {
  jwtSecret: 'MyS3cr3tK3Y',
  jwtSession: {
    session: false
  },
  development: {
    rootPath: rootPath,
    db: `mongodb://localhost/${databaseName}`,
    port: 1312
  },
  staging: {

  },
  production: {
    rootPath: rootPath,
    db: process.env.MONGO_DB_CONN_STRING,
    port: process.env.port
  }
}
