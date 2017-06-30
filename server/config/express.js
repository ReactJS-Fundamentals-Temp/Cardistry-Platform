const express = require('express')
const bodyParser = require('body-parser')
const fileUpload = require('express-fileupload')
const session = require('express-session')
const hbs = require('express-handlebars')
const passport = require('passport')
const webpack = require('webpack')
const webpackMiddleware = require('webpack-dev-middleware')
const webpackHotMiddleware = require('webpack-hot-middleware')
const webpackConfig = require('../../webpack.config.js')
const path = require('path')
const morgan = require('morgan')

module.exports = (config, app, env) => {
  app.use(morgan('dev'))
  app.set('views', config.rootPath + 'server/views')
  app.set('view engine', 'hbs')
  app.engine('hbs', hbs({
    extname: 'hbs',
    defaultLayout: 'master',
    layoutsDir: config.rootPath + 'server/views/layouts/',
    helpers: {
      section: function (name, options) {
        if (!this._sections) this._sections = {}
        this._sections[name] = options.fn(this)
        return null
      },
      formatDate: require('handlebars-dateformat'),
      ifCond: function (v1, v2, options) {
        if (v1 === v2) {
          return options.fn(this)
        }

        return options.inverse(this)
      },
      compareIds: function (id1, id2, options) {
        if (String(id1) === String(id2)) {
          return options.fn(this)
        }

        return options.inverse(this)
      },
      isAdmin: function (user, options) {
        if (user) {
          if (user.roles.includes('Admin')) {
            return options.fn(this)
          }
        }

        return options.inverse(this)
      },
      times: function (n, options) {
        var accum = ''
        for (var i = 0; i <= n; ++i) { accum += options.fn(i) }
        return accum
      },
      isLink: function (linkStr, options) {
        var link = linkStr.match(/https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g)

        if (link) {
          return options.fn(this)
        }

        return options.inverse(this)
      },
      formatMessage: function (message, options) {
        var links = message.match(/https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g)
        var isImage = false

        if (links) {
          if (links[0].endsWith('jpg') || links[0].endsWith('jpeg') || links[0].endsWith('png')) {
            isImage = true
          }
          if (isImage) {
            return `<a href="${message}" target="_blank"><img src="${message}" class="img-responsive"></a>`
          } else {
            return `<a href="${message}" target="_blank">${message}</a>`
          }
        } else {
          return `<p>${message}</p>`
        }
      }
    }
  }))
  app.use(bodyParser.json())
  app.use(bodyParser.urlencoded({ extended: true }))
  app.use(fileUpload())
  app.use(session({ secret: 'nnk', saveUninitialized: false, resave: false }))
  app.use(passport.initialize())
  app.use(passport.session())
  app.use((req, res, next) => {
    if (req.user) {
      res.locals.currentUser = req.user
    }

    next()
  })

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
      console.log(req.url)
      console.log(req.url)
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

  console.log(config.rootPath, 'rootPath')
  app.use('/client', express.static(config.rootPath + '/client/'))
  app.use('/node_modules', express.static(config.rootPath + '/node_modules'))
  app.use('/bower_components', express.static(config.rootPath + '/bower_components'))
}
