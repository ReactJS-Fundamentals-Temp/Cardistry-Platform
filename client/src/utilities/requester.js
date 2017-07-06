import axios from 'axios'
import { BASE_URL, API_VERSION } from './api'

function get (url, useSession) {
  let requestHeaders = _getHeaders(false, useSession)
  return _makeRequest('GET', url, {}, requestHeaders)
}

function post (url, data, useSession) {
  let requestHeaders = _getHeaders(data, useSession)
  return _makeRequest('POST', url, data, requestHeaders)
}

function _makeRequest (method, url, data, headers) {
  return axios({
    method: method,
    url: url,
    data: data,
    headers: headers
  })
}

function _getHeaders (isJSON, useSession) {
  let headers = {}

  if (isJSON) {
    headers['Content-Type'] = 'application/json'
  }

  if (useSession) {
    const token = sessionStorage.getItem('token')

    headers['Authorization'] = `JWT ${token}`
  }

  return headers
}

export default {
  get,
  post
}
