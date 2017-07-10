import { browserHistory } from 'react-router'

import { BASE_URL, API_VERSION } from '../../utilities/api'
import requester from '../../utilities/requester'

const SERVICE_URL = `${BASE_URL}/${API_VERSION}/tournaments`

// Action Types
const FETCH_TOURNAMENTS = 'FETCH_TOURNAMENTS'
const CREATE_TOURNAMENT = 'CREATE_TOURNAMENT'
const JOIN_TOURNAMENT = 'JOIN_TOURNAMENT'
const FETCH_USER_TOURNAMENTS = 'FETCH_USER_TOURNAMENTS'
const SEARCH_TOURNAMENTS = 'SEARCH_TOURNAMENTS'
const TOURNAMENT_ERROR = 'TOURNAMENT_ERROR'

// Action Creators
export function fetchTournaments () {
  return dispatch => {
    requester.get(SERVICE_URL, false)
            .then(response => {
              console.log(response.data.tournaments, 'res')
              dispatch({type: FETCH_TOURNAMENTS, payload: { tournaments: response.data.tournaments }})
            })
            .catch(response => {
              console.log(response, 'err')
              dispatch(tournamentError('There was a problem fetching the tournaments.'))
            })
  }
}

export function createTournament ({title, description, participantsLimit, contestantsLimit, roundsCount, prize}) {
  return dispatch => {
    const url = SERVICE_URL
    const data = {title, description, participantsLimit, contestantsLimit, roundsCount, prize}

    requester.post(url, data, true)
      .then(response => {
        console.log(response.data, 'res')
        dispatch({type: CREATE_TOURNAMENT})
        browserHistory.push('/tournaments')
      })
      .catch(response => {
        console.log(response, 'err')
        dispatch(tournamentError('There was a problem creating the tournament.'))
      })
  }
}

export function joinTournament (tournamentId) {
  return dispatch => {
    const url = SERVICE_URL + `/join/${tournamentId}`
    const data = {}

    requester.put(url, data, true)
      .then(response => {
        console.log(response.data, 'res')
        dispatch({type: JOIN_TOURNAMENT})
        browserHistory.push('/tournaments')
      })
      .catch(response => {
        console.log(response, 'err')
        dispatch(tournamentError('There was a problem creating the tournament.'))
      })
  }
}

export function fetchUserTournaments (username) {
  return dispatch => {
    const url = SERVICE_URL + `/${username}`

    requester.get(url, false)
      .then(response => {
        console.log(response.data.tournaments, 'res')
        dispatch({type: FETCH_USER_TOURNAMENTS, payload: { tournaments: response.data.tournaments }})
      })
      .catch(response => {
        console.log(response, 'err')
        dispatch(tournamentError('There was a problem fetching the tournaments.'))
      })
  }
}

export function searchTournaments (title) {
  return dispatch => {
    const url = SERVICE_URL + `/tournaments/search/${title}`

    requester.get(url, false)
      .then(response => {
        console.log(response.data.tournaments, 'res')
        dispatch({type: SEARCH_TOURNAMENTS, payload: { tournament: response.data.tournaments }})
      })
      .catch(response => {
        console.log(response, 'err')
        dispatch(tournamentError('There was a problem searching the tournaments.'))
      })
  }
}

export function tournamentError (error) {
  return dispatch => {
    dispatch({
      type: TOURNAMENT_ERROR,
      payload: error
    })
  }
}

// Reducer
export default function reducer (state = {all: [], userTournaments: [], searchResults: []}, action = {}) {
  switch (action.type) {
    case FETCH_TOURNAMENTS:
      return Object.assign({}, state, { all: action.payload.tournaments })
    case FETCH_USER_TOURNAMENTS:
      return Object.assign({}, state, { userTournaments: action.payload.tournaments })
    case SEARCH_TOURNAMENTS:
      return Object.assign({}, state, { searchResults: state.searchResults.concat(action.payload.tournaments) })
    case TOURNAMENT_ERROR:
      return Object.assign({}, state, { error: action.payload })

    case CREATE_TOURNAMENT:
    case JOIN_TOURNAMENT:
    default: return state
  }
}
