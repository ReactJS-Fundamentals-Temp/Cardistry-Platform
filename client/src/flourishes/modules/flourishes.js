import { browserHistory } from 'react-router'

import { BASE_URL, API_VERSION } from '../../utilities/api'
import requester from '../../utilities/requester'

const SERVICE_URL = `${BASE_URL}/${API_VERSION}/flourishes`

// Action Types
const FETCH_FLOURISHES = 'FETCH_FLOURISHES'
const CREATE_FLOURISH = 'CREATE_FLOURISH'
const FETCH_USER_FLOURISHES = 'FETCH_USER_FLOURISHES'
const FLOURISH_ERROR = 'FLOURISH_ERROR'

// Action Creators
export function fetchFlourishes () {
  return dispatch => {
    requester.get(SERVICE_URL)
            .then(response => {
              console.log(response.data.flourishes, 'res')
              dispatch({type: FETCH_FLOURISHES, payload: { flourishes: response.data.flourishes }})
            })
            .catch(response => {
              console.log(response, 'err')
              dispatch(flourishError('There was a problem fetching the flourishes.'))
            })
  }
}

export function createFlourish ({title, description, video, thumbnail, images}) {
  return dispatch => {
    const url = SERVICE_URL
    const data = {title, description, video, thumbnail, images}

    requester.post(url, data, true)
      .then(response => {
        console.log(response.data, 'res')
        dispatch({type: CREATE_FLOURISH})
        browserHistory.push('/flourishes')
      })
      .catch(response => {
        console.log(response, 'err')
        dispatch(flourishError('There was a problem creating the flourish.'))
      })
  }
}

export function fetchUserFlourishes (username) {
  return dispatch => {
    const url = SERVICE_URL + `/${username}`

    requester.get(url)
      .then(response => {
        console.log(response.data.flourishes, 'res')
        dispatch({type: FETCH_USER_FLOURISHES, payload: { flourishes: response.data.flourishes }})
      })
      .catch(response => {
        console.log(response, 'err')
        dispatch(flourishError('There was a problem fetching the flourishes.'))
      })
  }
}

export function flourishError (error) {
  return dispatch => {
    dispatch({
      type: FLOURISH_ERROR,
      payload: error
    })
  }
}

// Reducer
export default function reducer (state = {all: [], userFlourishes: []}, action = {}) {
  switch (action.type) {
    case FETCH_FLOURISHES:
      return Object.assign({}, state, { all: action.payload.flourishes })
    case FETCH_USER_FLOURISHES:
      return Object.assign({}, state, { userFlourishes: action.payload.flourishes })
    case FLOURISH_ERROR:
      return Object.assign({}, state, { error: action.payload })

    case CREATE_FLOURISH:
    default: return state
  }
}
