import React, { Component } from 'react'
import { IndexRoute, Router, Route } from 'react-router'
import { history } from './configureStore'

import App from './components/App'

import HomePage from './pages/HomePage'
import AboutPage from './pages/AboutPage'
import ContactsPage from './pages/ContactsPage'

import RegisterPage from './authentication/pages/RegisterPage'
import LoginPage from './authentication/pages/LoginPage'

import NotFoundPage from './pages/NotFoundPage'
import PracticePage from './pages/PracticePage'
import VersusPage from './pages/VersusPage'

export default class Routes extends Component {
  render () {
    return (
      <Router history={history}>
        <Route path='/' component={App}>
          <IndexRoute component={HomePage} />
          {/* Common */}
          <Route path='/about' component={AboutPage} />
          <Route path='/contacts' component={ContactsPage} />

          {/* Authentication */}
          <Route path='/register' component={RegisterPage} />
          <Route path='/login' component={LoginPage} />

          {/* Practice */}
          <Route path='/practice' component={PracticePage} />

          {/* Versus */}
          <Route path='/versus' component={VersusPage} />

          <Route path='*' component={NotFoundPage} />
        </Route>
      </Router>
    )
  }
}
