import { browserHistory } from 'react-router'

import { BASE_URL, API_VERSION } from '../../utilities/api'
import requester from '../../utilities/requester'

const SERVICE_URL = `${BASE_URL}/${API_VERSION}/practices`

// Action Types
const FETCH_CURRENT_USER_PRACTICE_LISTS = 'FETCH_CURRENT_USER_PRACTICE_LISTS'
const CREATE_PRACTICE_LIST = 'CREATE_PRACTICE_LIST'

const FETCH_PRACTICE_TYPES = 'FETCH_PRACTICE_TYPES'
const START_PRACTICE = 'START_PRACTICE'
const FETCH_PRACTICE = 'FETCH_PRACTICE'

const COMPLETE_STEP = 'COMPLETE_STEP'
const COMPLETE_PRACTICE = 'COMPLETE_PRACTICE'

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
        dispatch(practiceError('There was a problem fetching the current users practice lists.'))
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
        dispatch(practiceError('There was a problem fetching the practice types.'))
      })
  }
}

export function startPractice ({selectedPracticeType, selectedPracticeTypeName, selectedPracticeList, required_consistency_repetitions}) {
  return dispatch => {
    const url = SERVICE_URL
    const data = {type: selectedPracticeType, practiceList: selectedPracticeList, required_consistency_repetitions}

    console.log(selectedPracticeTypeName)

    requester.post(url, data, true)
      .then(response => {
        console.log(response.data, 'res')
        const practice = response.data.practice

        dispatch({type: START_PRACTICE})
        browserHistory.push(`/user/practices/${selectedPracticeTypeName}/${practice._id}`)
      })
      .catch(response => {
        console.log(response, 'err')
        dispatch(practiceError('There was a problem creating the practice.'))
      })
  }
}

export function fetchPractice (id) {
  return dispatch => {
    const url = SERVICE_URL + `/current-practice/${id}`

    requester.get(url, true)
      .then(response => {
        console.log(response.data, 'res')

        dispatch({type: FETCH_PRACTICE, payload: {practice: response.data.practice}})
      })
      .catch(response => {
        console.log(response, 'err')
        dispatch(practiceError('There was a problem fetching the practice.'))
      })
  }
}

export function completeStep (id, {successes, fails}) {
  return dispatch => {
    const url = SERVICE_URL + `/current-practice/${id}/complete-step`

    requester.put(url, {successes, fails}, true)
      .then(response => {
        dispatch({type: COMPLETE_STEP, payload: {practice: response.data.practice}})
      })
      .catch(response => {
        console.log(response, 'err')
        dispatch(practiceError('There was a problem completing the step.'))
      })
  }
}

export function completePractice (id, {successes, fails}) {
  return dispatch => {
    const url = SERVICE_URL + `/current-practice/${id}/complete-practice`

    requester.put(url, {successes, fails}, true)
      .then(response => {
        const practice = response.data.practice
        dispatch({type: COMPLETE_PRACTICE, payload: {practice}})
        browserHistory.push(`/user/practices/${practice._id}`)
      })
      .catch(response => {
        console.log(response, 'err')
        dispatch(practiceError('There was a problem completing the practice.'))
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

const defaultState = {
  currentUserPracticeLists: [],
  practiceTypes: [],
  currentPractice: {},
  currentFlourish: {},
  nextFlourish: {}
}

// Reducer
export default function reducer (state = defaultState, action) {
  switch (action.type) {
    case FETCH_PRACTICE:
      const practice = action.payload.practice
      const currentFlourish = practice._practice_list.flourishes[practice.step]
      const nextFlourish = practice._practice_list.flourishes[practice._practice_list.flourishes.length === 1 ? 0 : practice.step + 1]

      return Object.assign({}, state, { currentPractice: practice, currentFlourish, nextFlourish })
    case FETCH_CURRENT_USER_PRACTICE_LISTS:
      return Object.assign({}, state, { currentUserPracticeLists: action.payload.practiceLists })
    case FETCH_PRACTICE_TYPES:
      return Object.assign({}, state, { practiceTypes: action.payload.practiceTypes })
    case PRACTICE_ERROR:
      return Object.assign({}, state, { error: action.payload })
    case COMPLETE_STEP:

      return Object.assign({}, state, {
        currentPractice: action.payload.practice,
        currentFlourish: action.payload.practice._practice_list.flourishes[action.payload.practice.step],
        nextFlourish: action.payload.practice._practice_list.flourishes[action.payload.practice._practice_list.flourishes.length === 1 ? 0 : action.payload.practice.step + 1]
      })
    case CREATE_PRACTICE_LIST:
    case START_PRACTICE:
    default:
      return state
  }
}
