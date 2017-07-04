const webpack = require('webpack')
const webpackMiddleware = require('webpack-dev-middleware')
const webpackHotMiddleware = require('webpack-hot-middleware')
const webpackConfig = require('../../webpack.config.js')
const path = require('path')

const users = require('../users/users-routes')
const flourishes = require('../flourishes/flourishes-routes')

module.exports = (app, env) => {
  app.use('/api/v1/users', users)
  app.use('/api/v1/flourishes', flourishes)

  if (env !== 'production') {
    console.log(env)
    const compiler = webpack(webpackConfig)
    const middleware = webpackMiddleware(compiler, {
      publicPath: webpackConfig.output.publicPath,
      contentBase: 'src',
      stats: {
        colors: true,
        hash: false,
        timings: true,
        chunks: false,
        chunkModules: false,
        modules: false
      }
    })

    app.use(middleware)
    app.use(webpackHotMiddleware(compiler))
    app.get('*', function response (req, res) {
      console.log('BASE')
      req.url = '/'
      app.handle(req, res)

      // res.write(middleware.fileSystem.readFileSync(path.join(__dirname, 'dist/index.html')))
      // res.end()
    })
  } else {
    app.use(express.static(__dirname + '/dist'))
    app.get('*', function response (req, res) {
      res.sendFile(path.join(__dirname, 'dist/index.html'))
    })
  }
}
