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
import RequireAuth from './authentication/containers/RequireAuth'
import RequireGuest from './authentication/containers/RequireGuest'

// Users
import ProfilePage from './users/containers/ProfilePage'

// Events
import EventsPage from './events/containers/EventsPage'
import CreateEventPage from './events/components/CreateEventPage'

// Flourishes
import FlourishesPage from './flourishes/containers/FlourishesPage'
import CreateFlourishPage from './flourishes/components/CreateFlourishPage'
import PortfolioPage from './flourishes/containers/PortfolioPage'

// Practices
import PracticePage from './practices/components/PracticePage'
import StartPracticePage from './practices/components/StartPracticePage'

// Practices - Practice Lists
import PracticeListsPage from './practices/containers/PracticeListsPage'
import CreatePracticeListPage from './practices/components/CreatePracticeListPage'

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
          <Route path='/register' component={RequireGuest(RegisterPage)} />
          <Route path='/login' component={RequireGuest(LoginPage)} />

          {/* Profile */}
          <Route path='/users/:username' component={ProfilePage} />
          <Route path='/users/:username/portfolio' component={PortfolioPage} />

          {/* Events */}
          <Route path='/events' component={EventsPage} />
          <Route path='/events/create' component={RequireAuth(CreateEventPage)} />

          {/* Flourishes */}
          <Route path='/flourishes' component={FlourishesPage} />
          <Route path='/flourishes/create' component={RequireAuth(CreateFlourishPage)} />

          {/* Practice */}
          <Route path='/practices' component={PracticePage} />
          <Route path='/practices/start' component={RequireAuth(StartPracticePage)} />
          <Route path='/practices/practice-lists' component={RequireAuth(PracticeListsPage)} />
          <Route path='/practices/practice-lists/create' component={RequireAuth(CreatePracticeListPage)} />

          {/* Versus */}
          <Route path='/versus' component={VersusPage} />

          <Route path='*' component={NotFoundPage} />
        </Route>
      </Router>
    )
  }
}
