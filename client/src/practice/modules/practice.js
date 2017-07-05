import { browserHistory } from 'react-router'

import { BASE_URL, API_VERSION } from '../../utilities/api'
import requester from '../../utilities/requester'

const SERVICE_URL = `${BASE_URL}/${API_VERSION}/events`

// Action Types
const FETCH_PRACTICE_LISTS = 'FETCH_PRACTICE_LISTS'
const CREATE_PRACTICE_LIST = 'CREATE_PRACTICE_LIST'
const PRACTICE_ERROR = 'PRACTICE_ERROR'

// Action Creators
export function createPracticeList ({flourishes}) {
  return dispatch => {

  }
}

export function practiceError (error) {
  return dispatch => {
    dispatch({
      type: PRACTICE_ERROR,
      payload: error
    })
  }
}

// Reducer
export default function reducer (state = { currentUser: [] }, action) {
  switch (action.type) {
    case FETCH_PRACTICE_LISTS:
      return Object.assign({}, state, { all: action.payload.practiceLists })
    case PRACTICE_ERROR:
      return Object.assign({}, state, { error: action.payload })
    case CREATE_PRACTICE_LIST:
    default:
      return state
  }
}
