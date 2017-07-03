import { createStore, applyMiddleware } from 'redux'
import reduxThunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import { browserHistory } from 'react-router'
import { syncHistoryWithStore } from 'react-router-redux'
import {persistStore, autoRehydrate} from 'redux-persist'

import configureRootReducer from './configureRootReducer'

const initialState = {}

const rootReducer = configureRootReducer()
const middleware = [reduxThunk]
const enhancers = []
const store = createStore(rootReducer, initialState, composeWithDevTools(applyMiddleware(...middleware), ...enhancers))

export const history = syncHistoryWithStore(browserHistory, store)

export default function configureStore () {
  // persistStore(store)

  return store
}
