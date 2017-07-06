import { browserHistory } from 'react-router'

import { BASE_URL, API_VERSION } from '../../utilities/api'
import requester from '../../utilities/requester'

const SERVICE_URL = `${BASE_URL}/${API_VERSION}/practices`

// Action Types
const FETCH_CURRENT_USER_PRACTICE_LISTS = 'FETCH_CURRENT_USER_PRACTICE_LISTS'
const CREATE_PRACTICE_LIST = 'CREATE_PRACTICE_LIST'

const FETCH_PRACTICE_TYPES = 'FETCH_PRACTICE_TYPES'
const START_PRACTICE = 'START_PRACTICE'

const PRACTICE_ERROR = 'PRACTICE_ERROR'

// Action Creators
export function fetchCurrentUserPracticeLists () {
  return dispatch => {
    const url = SERVICE_URL + '/practice-lists'

    requester.get(url, true)
      .then(response => {
        console.log(response.data, 'res')
        dispatch({type: FETCH_CURRENT_USER_PRACTICE_LISTS, payload: {practiceLists: response.data.practiceLists}})
      })
      .catch(response => {
        console.log(response, 'err')
        dispatch(practiceError('There was a fetching the current users practice lists.'))
      })
  }
}

export function createPracticeList ({flourishes, title}) {
  return dispatch => {
    const url = SERVICE_URL + '/practice-lists'
    const data = {flourishes, title}

    requester.post(url, data, true)
      .then(response => {
        console.log(response.data, 'res')
        dispatch({type: CREATE_PRACTICE_LIST})
        browserHistory.push('/practices/practice-lists')
      })
      .catch(response => {
        console.log(response, 'err')
        dispatch(practiceError('There was a problem creating the practice list.'))
      })
  }
}

export function fetchPracticeTypes () {
  return dispatch => {
    const url = SERVICE_URL + '/practice-types'

    requester.get(url, false)
      .then(response => {
        console.log(response.data, 'res')
        dispatch({type: FETCH_PRACTICE_TYPES, payload: {practiceTypes: response.data.practiceTypes}})
      })
      .catch(response => {
        console.log(response, 'err')
        dispatch(practiceError('There was a problem creating the practice list.'))
      })
  }
}

export function startPractice ({selectedPracticeType, selectedPracticeList, required_consistency_repetitions}) {
  return dispatch => {
    const url = SERVICE_URL
    const data = {type: selectedPracticeType, practiceList: selectedPracticeList, required_consistency_repetitions}

    requester.post(url, data, true)
      .then(response => {
        console.log(response.data, 'res')
        dispatch({type: START_PRACTICE, payload: {currentPractice: response.data.practice}})
        browserHistory.push('/practices/' + response.data.practice._id)
      })
      .catch(response => {
        console.log(response, 'err')
        dispatch(practiceError('There was a problem creating the practice.'))
      })
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
export default function reducer (state = { currentUserPracticeLists: [], practiceTypes: [], currentPractice: {} }, action) {
  switch (action.type) {
    case START_PRACTICE:
      return Object.assign({}, state, { currentPractice: action.payload.practice })
    case FETCH_CURRENT_USER_PRACTICE_LISTS:
      return Object.assign({}, state, { currentUserPracticeLists: action.payload.practiceLists })
    case FETCH_PRACTICE_TYPES:
      return Object.assign({}, state, { practiceTypes: action.payload.practiceTypes })
    case PRACTICE_ERROR:
      return Object.assign({}, state, { error: action.payload })
    case CREATE_PRACTICE_LIST:
    default:
      return state
  }
}
