import { browserHistory } from 'react-router'

import { BASE_URL, API_VERSION } from '../../utilities/api'
import requester from '../../utilities/requester'

const SERVICE_URL = `${BASE_URL}/${API_VERSION}/`

// Action Types
const FETCH_USERS = 'FETCH_USERS'
const REMOVE_USER = 'REMOVE_USER'
const ADMINISTRATION_ERROR = 'PRACTICE_ERROR'

// Action Creators
export function fetchUsers () {
  return dispatch => {
    const url = SERVICE_URL + 'users'
    console.log(url)
    requester.get(url, true)
      .then(response => {
        console.log(response.data, 'res')
        dispatch({type: FETCH_USERS, payload: {users: response.data.users}})
      })
      .catch(response => {
        console.log(response, 'err')
        dispatch(practiceError('There was a problem fetching the current users practice lists.'))
      })
  }
}

export function removeUser (userId) {
  return dispatch => {
    const url = SERVICE_URL + 'users/' + userId
    console.log(url)
    requester.remove(url, {}, true)
      .then(response => {
        console.log(response.data, 'res')
        dispatch({type: REMOVE_USER})
      })
      .catch(response => {
        console.log(response, 'err')
        dispatch(practiceError('There was a problem fetching the current users practice lists.'))
      })
  }
}

export function practiceError (error) {
  return dispatch => {
    dispatch({
      type: ADMINISTRATION_ERROR,
      payload: error
    })
  }
}

// Reducer
export default function reducer (state = { users: {all: []} }, action) {
  switch (action.type) {
    case FETCH_USERS:
      return Object.assign({}, state, { users: { all: action.payload.users } })
    case ADMINISTRATION_ERROR:
      return Object.assign({}, state, { error: action.payload })
    case REMOVE_USER:
    default:
      return state
  }
}
