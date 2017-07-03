import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'

import configureStore from './configureStore'
import Routes from './Routes'

import { LOGIN_USER } from './authentication/modules/authentication'

const store = configureStore()

const token = sessionStorage.getItem('token')

if (token) {
  store.dispatch({type: LOGIN_USER, payload: {user: store.getState().authentication.currentUser}})
}

ReactDOM.render(
  <Provider store={store}>
    <Routes />
  </Provider>,
  document.querySelector('.app'))
