import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'

import configureStore from './configureStore'
import Routes from './Routes'

const store = configureStore()
console.log(store, 'store')

ReactDOM.render(
  <Provider store={store}>
    <Routes />
  </Provider>,
  document.querySelector('.container'))
