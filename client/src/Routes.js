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
import RequireAdmin from './authentication/containers/RequireAdmin'

// Users
import ProfilePage from './users/containers/ProfilePage'

// Events
import EventsPage from './events/containers/EventsPage'
import CreateEventPage from './events/components/CreateEventPage'

// Flourishes
import FlourishesPage from './flourishes/containers/FlourishesPage'
import CreateFlourishPage from './flourishes/components/CreateFlourishPage'
import PortfolioPage from './flourishes/containers/PortfolioPage'

// Tournaments
import TournamentsPage from './tournaments/containers/TournamentsPage'
import CreateTournamentPage from './tournaments/components/CreateTournamentPage'

// Practices
import PracticePage from './practices/components/PracticePage'
import StartPracticePage from './practices/components/StartPracticePage'
import ConsistencyPractice from './practices/containers/ConsistencyPractice'
import PracticeSummary from './practices/containers/PracticeSummary'
import Practices from './practices/containers/Practices'

// Practices - Practice Lists
import PracticeListsPage from './practices/containers/PracticeListsPage'
import CreatePracticeListPage from './practices/components/CreatePracticeListPage'

// Versus
import VersusPage from './pages/VersusPage'

// Administration
import Dashboard from './administration/components/Dashboard'
import Users from './administration/containers/Users'

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

          {/* Tournaments */}
          <Route path='/tournaments' component={TournamentsPage} />
          <Route path='/tournaments/create' component={RequireAuth(CreateTournamentPage)} />

          {/* Practice */}
          <Route path='/practices' component={PracticePage} />
          <Route path='/user/practices/start' component={RequireAuth(StartPracticePage)} />
          <Route path='/user/practices/practice-lists' component={RequireAuth(PracticeListsPage)} />
          <Route path='/user/practices/practice-lists/create' component={RequireAuth(CreatePracticeListPage)} />
          <Route path='/user/practices/consistency/:id' component={RequireAuth(ConsistencyPractice)} />
          <Route path='/user/practices/:id' component={RequireAuth(PracticeSummary)} />
          <Route path='/user/practices' component={RequireAuth(Practices)} />

          {/* Versus */}
          <Route path='/versus' component={VersusPage} />

          {/* Administration */}
          <Route path='/admin/dashboard' component={RequireAdmin(Dashboard)} />
          <Route path='/admin/users' component={RequireAdmin(Users)} />

          <Route path='*' component={NotFoundPage} />
        </Route>
      </Router>
    )
  }
}
