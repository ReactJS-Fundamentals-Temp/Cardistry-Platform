import axios from 'axios'
import { browserHistory } from 'react-router'

import { BASE_URL, API_VERSION } from '../../utilities/api'
import requester from '../../utilities/requester'
import { SET_ERROR } from '../../errors'

const SERVICE_URL = `${BASE_URL}/${API_VERSION}/users`

// Actions
// const REGISTER_USER = 'REGISTER_USER'
export const LOGIN_USER = 'LOGIN_USER'
const LOGOUT_USER = 'LOGOUT_USER'

// Action Creators
export function registerUser ({email, username, password, confirmPassword}) {
  return dispatch => {
    requester.post(`${SERVICE_URL}/register`, { email, username, password, confirmPassword })
            .then(response => {
              browserHistory.push('/login')
            })
            .catch(response => {
              console.log(response, 'err')
              dispatch({
                type: SET_ERROR,
                payload: 'Problem with registration.'
              })
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
              dispatch({
                type: SET_ERROR,
                payload: 'Wrong email or password.'
              })
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

// Reducer
export default function reducer (state = { authenticated: false, currentUser: {} }, action = {}) {
  switch (action.type) {
    case LOGIN_USER:
      return Object.assign({}, state, { authenticated: true, currentUser: action.payload.user })
    case LOGOUT_USER:
      return Object.assign({}, state, { authenticated: false, currentUser: {} })
    default: return state
  }
}
