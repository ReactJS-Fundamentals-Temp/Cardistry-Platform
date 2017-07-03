import { combineReducers } from 'redux'
import { reducer as formReducer } from 'redux-form'
import { routerReducer } from 'react-router-redux'

import authenticationReducer from './authentication/modules/authentication'
import flourishesReducer from './flourishes/modules/flourishes'

const configureRootReducer = () => {
  const reducers = {
    form: formReducer,
    routing: routerReducer,
    authentication: authenticationReducer,
    flourishes: flourishesReducer
  }

  const rootReducer = combineReducers(reducers)

  return rootReducer
}

export default configureRootReducer
