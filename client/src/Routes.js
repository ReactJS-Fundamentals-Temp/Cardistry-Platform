import React, { Component } from 'react'
import { IndexRoute, Router, Route } from 'react-router'
import { history } from './configureStore'

import App from './App'

// Shared
import HomePage from './pages/HomePage'
import AboutPage from './pages/AboutPage'
import ContactsPage from './pages/ContactsPage'

// Authentication
import RegisterPage from './authentication/components/RegisterPage'
import LoginPage from './authentication/components/LoginPage'
import ProfilePage from './authentication/components/ProfilePage'

// Flourishes
import FlourishesPage from './flourishes/containers/FlourishesPage'
import AddFlourishPage from './flourishes/components/AddFlourishPage'

// Practice
import PracticePage from './practice/components/PracticePage'

// Versus
import VersusPage from './pages/VersusPage'

import NotFoundPage from './pages/NotFoundPage'

export default class Routes extends Component {
  render () {
    return (
      <Router history={history}>
        <Route path='/' component={App}>
          {/* Common */}
          <IndexRoute component={HomePage} />
          <Route path='/about' component={AboutPage} />
          <Route path='/contacts' component={ContactsPage} />

          {/* Authentication */}
          <Route path='/register' component={RegisterPage} />
          <Route path='/login' component={LoginPage} />
          <Route path='/users/:username' component={ProfilePage} />

          {/* Flourishes */}
          <Route path='/flourishes' component={FlourishesPage} />
          <Route path='/flourishes/add' component={AddFlourishPage} />


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
