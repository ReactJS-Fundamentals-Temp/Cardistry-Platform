import { browserHistory } from 'react-router'

import { BASE_URL, API_VERSION } from '../../utilities/api'
import requester from '../../utilities/requester'

const SERVICE_URL = `${BASE_URL}/${API_VERSION}/practices/consistency`

// Action Types
const INCREMENT_STREAK = 'INCREMENT_STREAK'
const RESET_STREAK = 'RESET_STREAK'

const RESET_SCORE = 'RESET_SCORE'

const CONSISTENCY_ERROR = 'CONSISTENCY_ERROR'

// Action Creators
export function incrementStreak () {
  return dispatch => {
    dispatch({type: INCREMENT_STREAK})
  }
}

export function resetStreak () {
  return dispatch => {
    dispatch({type: RESET_STREAK})
  }
}

export function resetScore () {
  return dispatch => {
    dispatch({type: RESET_SCORE})
  }
}

const defaultState = {
  streak: 0,
  totalSuccesses: 0,
  totalFails: 0
}

// Reducer
export default function reducer (state = defaultState, action) {
  switch (action.type) {
    case INCREMENT_STREAK:
      return Object.assign({}, state, { streak: state.streak + 1, totalSuccesses: state.totalSuccesses + 1 })
    case RESET_STREAK:
      return Object.assign({}, state, { streak: 0, totalFails: state.totalFails + 1 })
    case RESET_SCORE:
      return Object.assign({}, state, { streak: 0, totalSuccesses: 0, totalFails: 0 })
    default:
      return state
  }
}
