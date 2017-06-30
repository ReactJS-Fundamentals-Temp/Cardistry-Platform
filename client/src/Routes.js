import React, { Component } from 'react'
import { IndexRoute, Router, Route } from 'react-router'
import { history } from './store/configureStore'

import App from './components/App'
import HomePage from './pages/HomePage'
import AboutPage from './pages/AboutPage'
import ContactsPage from './pages/ContactsPage'
import NotFoundPage from './pages/NotFoundPage'
import PracticePage from './pages/PracticePage'
import VersusPage from './pages/VersusPage'

export default class Routes extends Component {
  render () {
    return (
      <Router history={history}>
        <Route path='/' component={App}>
          <IndexRoute component={HomePage} />
          <Route path='/practice' component={PracticePage} />
          <Route path='/versus' component={VersusPage} />
          <Route path='/about' component={AboutPage} />
          <Route path='/contacts' component={ContactsPage} />
          <Route path='*' component={NotFoundPage} />
        </Route>
      </Router>
    )
  }
}
