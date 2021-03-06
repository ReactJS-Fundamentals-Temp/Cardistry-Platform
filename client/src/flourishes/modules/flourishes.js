import { browserHistory } from 'react-router'

import { BASE_URL, API_VERSION } from '../../utilities/api'
import requester from '../../utilities/requester'
import { SET_ERROR } from '../../errors'

const SERVICE_URL = `${BASE_URL}/${API_VERSION}/flourishes`

// Action Types
const FETCH_FLOURISHES = 'FETCH_FLOURISHES'
const CREATE_FLOURISH = 'CREATE_FLOURISH'
const FETCH_USER_FLOURISHES = 'FETCH_USER_FLOURISHES'
const SEARCH_FLOURISHES = 'SEARCH_FLOURISHES'
const RESET_SEARCH = 'RESET_SEARCH'

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
              dispatch({
                type: SET_ERROR,
                payload: 'There was a problem fetching the flourishes.'
              })
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
        dispatch({
          type: SET_ERROR,
          payload: 'There was a problem creating the flourish.'
        })
      })
  }
}

export function fetchUserFlourishes (username) {
  return dispatch => {
    const url = SERVICE_URL + `/${username}`

    requester.get(url, false)
      .then(response => {
        console.log(response.data.flourishes, 'res')
        dispatch({type: FETCH_USER_FLOURISHES, payload: { flourishes: response.data.flourishes }})
      })
      .catch(response => {
        console.log(response, 'err')
        dispatch({
          type: SET_ERROR,
          payload: 'There was a problem fetching the flourishes.'
        })
      })
  }
}

export function searchFlourishes (title) {
  return dispatch => {
    const url = SERVICE_URL + `/search/${title}`

    requester.get(url, false)
      .then(response => {
        console.log(response.data.flourishes, 'res')
        dispatch({type: SEARCH_FLOURISHES, payload: { flourishes: response.data.flourishes }})

        if (response.data.flourishes.length < 1) {
          dispatch({
            type: SET_ERROR,
            payload: 'No flourishes found in our vault. Please try to find another flourish.'
          })
        }
      })
      .catch(response => {
        console.log(response, 'err')
        dispatch({
          type: SET_ERROR,
          payload: 'There was a problem searching the flourishes.'
        })
      })
  }
}

export function resetSearch () {
  return dispatch => {
    dispatch({type: RESET_SEARCH})
  }
}

// Reducer
export default function reducer (state = {all: [], userFlourishes: [], searchResults: []}, action = {}) {
  switch (action.type) {
    case FETCH_FLOURISHES:
      return Object.assign({}, state, { all: action.payload.flourishes })
    case FETCH_USER_FLOURISHES:
      return Object.assign({}, state, { userFlourishes: action.payload.flourishes })
    case SEARCH_FLOURISHES:
      return Object.assign({}, state, { searchResults: state.searchResults.concat(action.payload.flourishes) })
    case RESET_SEARCH:
      return Object.assign({}, state, { searchResults: [] })
    case CREATE_FLOURISH:
    default: return state
  }
}
