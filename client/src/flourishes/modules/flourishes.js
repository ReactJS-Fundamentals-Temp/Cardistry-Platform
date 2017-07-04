import axios from 'axios'
import { browserHistory } from 'react-router'

import { BASE_URL, API_VERSION } from '../../utilities/api'
import requester from '../../utilities/requester'

// Actions
const FETCH_FLOURISHES = 'FETCH_FLOURISHES'
const CREATE_FLOURISH = 'CREATE_FLOURISH'
const FLOURISH_ERROR = 'FLOURISH_ERROR'

// Action Creators
export function fetchFlourishes () {
  return dispatch => {
    axios.get(`${BASE_URL}/${API_VERSION}/flourishes`)
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
    const url = `${BASE_URL}/${API_VERSION}/flourishes`
    const data = {title, description, video, thumbnail, images}

    requester.post(url, data, true)
      .then(response => {
        console.log(response.data, 'res')
        dispatch({type: CREATE_FLOURISH})
        browserHistory.push('/flourishes')
      }).catch(response => {
        console.log(response, 'err')
        dispatch(flourishError('There was a problem creating the flourish.'))
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
export default function reducer (state = {all: []}, action = {}) {
  switch (action.type) {
    case FETCH_FLOURISHES:
      return Object.assign({}, state, { all: action.payload.flourishes })
    case FLOURISH_ERROR:
      return Object.assign({}, state, { error: action.payload })

    case CREATE_FLOURISH:
    default: return state
  }
}
