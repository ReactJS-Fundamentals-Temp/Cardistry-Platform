import { createStore, applyMiddleware } from 'redux'
import reduxThunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import { browserHistory } from 'react-router'
import { syncHistoryWithStore } from 'react-router-redux'

import configureRootReducer from './configureRootReducer'

const initialState = {}

const rootReducer = configureRootReducer()
const middleware = [reduxThunk]
const store = createStore(rootReducer, initialState, composeWithDevTools(applyMiddleware(...middleware)))

export const history = syncHistoryWithStore(browserHistory, store)

export default function configureStore () {
  return store
}
