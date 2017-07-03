import axios from 'axios'
import { BASE_URL, API_VERSION } from '../../utilities/api'

// Actions
const FETCH_FLOURISHES = 'FETCH_FLOURISHES'

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
            })
  }
}

// Reducer
export default function reducer (state = {all: []}, action = {}) {
  switch (action.type) {
    case FETCH_FLOURISHES:
      return Object.assign({}, state, { all: action.payload.flourishes })
    default: return state
  }
}
