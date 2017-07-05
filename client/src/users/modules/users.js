import { browserHistory } from 'react-router'

import { BASE_URL, API_VERSION } from '../../utilities/api'
import requester from '../../utilities/requester'

const SERVICE_URL = `${BASE_URL}/${API_VERSION}/users`

// Action Types
const FETCH_USER = 'FETCH_USER'

// Action Creators
export function fetchUser (username) {
  return dispatch => {
    const url = SERVICE_URL + `/${username}`

    requester.get(url, false)
        .then(response => {
          console.log(response, 'USER RESPONSE')

          dispatch({type: FETCH_USER, payload: { user: response.data.user }})
        })
        .catch(response => {

        })
  }
}

// Reducer
export default function reducer (state = { selectedUser: {} }, action = {}) {
  switch (action.type) {
    case FETCH_USER:
      return Object.assign({}, state, { selectedUser: action.payload.user })
    default:
      return state
  }
}
