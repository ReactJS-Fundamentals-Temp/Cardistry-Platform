import axios from 'axios'
import { BASE_URL, API_VERSION } from '../../utilities/api'

let instance = null

export default class Requester {
  constructor () {
    if (!instance) {
      instance = this
    }

    return instance
  }

  get (url, useSession) {

  }

  post (url, data, useSession) {
    return axios.post(`${BASE_URL}/${API_VERSION}/${url}`, data)
  }

  put (url, data, useSession) {
  }

  remove (url, data, useSession) {

  }

  _getHeaders (isJSON, useSession) {
    return this.getAuthorizationHeaders(isJSON, useSession)
  }

  getAuthorizationHeaders (isJSON, useSession) {
    let headers = {}

    if (isJSON) {
      headers['Content-Type'] = 'application/json'
      axios.defaults.headers.common['Authorization'] = store.getState().session.token
    }

    if (useSession) {
      const token = sessionStorage.getItem('token')

      headers['Authorization'] = 'Authorization ' + token
      axios.defaults.headers.common['Authorization'] = 'JWT ' + token
    }

    return headers
  }
}
