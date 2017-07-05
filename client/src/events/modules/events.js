import { browserHistory } from 'react-router'

import { BASE_URL, API_VERSION } from '../../utilities/api'
import requester from '../../utilities/requester'

const SERVICE_URL = `${BASE_URL}/${API_VERSION}/events`

// Action Types
const FETCH_EVENTS = 'FETCH_EVENTS'
const EVENTS_ERROR = 'EVENTS_ERROR'
const CREATE_EVENT = 'CREATE_EVENT'

// Action Creators
export function fetchEvents() {
    return dispatch => {
        requester.get(SERVICE_URL, false)
            .then(response => {
                console.log(response, 'FETCH EVENTSSSS')
                dispatch({ type: FETCH_EVENTS, payload: { events: response.data.events } })
            })
            .catch(response => {
                console.log(response, 'FETCH EVENTSSSS')
                dispatch(eventsError('There was a problem fetching the events.'))
            }
        )
    }
}

export function createEvent ({title, description, location}) {
    const data = { title, description, location}

    return dispatch => {
        requester.post(SERVICE_URL, data, true)
            .then(response => {
                dispatch({
                    type: CREATE_EVENT
                })

                browserHistory.push('/events')
            })
            .catch(response => {

            })
    }
}

export function eventsError (error) {
  return dispatch => {
    dispatch({
      type: EVENTS_ERROR,
      payload: error
    })
  }
}

// Reducer
export default function reducer(state = { all: [] }, action) {
    switch (action.type) {
        case FETCH_EVENTS:
            return Object.assign({}, state, { all: action.payload.events })
        case EVENTS_ERROR:
            return Object.assign({}, state, { error: action.payload })
        case CREATE_EVENT:
        default:
            return state
    }
}
