import axios from 'axios'
import { browserHistory } from 'react-router'

import { BASE_URL, API_VERSION } from '../../utilities/api'
import requester from '../../utilities/requester'

const SERVICE_URL = `${BASE_URL}/${API_VERSION}/users`

// Actions
// const REGISTER_USER = 'REGISTER_USER'
export const LOGIN_USER = 'LOGIN_USER'
const LOGOUT_USER = 'LOGOUT_USER'
const AUTH_ERROR_USER = 'AUTH_ERROR_USER'

// Action Creators
export function registerUser ({email, username, password, confirmPassword}) {
  return dispatch => {
    requester.post(`${SERVICE_URL}/register`, { email, username, password, confirmPassword })
            .then(response => {
              browserHistory.push('/login')
            })
            .catch(response => {
              console.log(response, 'err')
              dispatch(authErrorUser(response.data.error))
            })
  }
}

export function loginUser ({email, password}) {
  return dispatch => {
    requester.post(`${SERVICE_URL}/signin`, { email, password })
            .then(response => {
              dispatch({type: LOGIN_USER, payload: { user: response.data.user }})
              sessionStorage.setItem('token', response.data.token)
              browserHistory.push('/')
            })
            .catch(err => {
              console.log(err)
              dispatch(authErrorUser('Wrong email or password.'))
            })
  }
}

export function logoutUser () {
  return dispatch => {
    dispatch({type: LOGOUT_USER})
    sessionStorage.removeItem('token')
    browserHistory.push('/login')
  }
}

export function authErrorUser (error) {
  return dispatch => {
    dispatch({
      type: AUTH_ERROR_USER,
      payload: error
    })
  }
}

// Reducer
export default function reducer (state = { authenticated: false, currentUser: {} }, action = {}) {
  switch (action.type) {
    case LOGIN_USER:
      return Object.assign({}, state, { authenticated: true, currentUser: action.payload.user })
    case LOGOUT_USER:
      return Object.assign({}, state, { authenticated: false, currentUser: {} })
    case AUTH_ERROR_USER:
      return Object.assign({}, state, { error: action.payload })
    default: return state
  }
}
