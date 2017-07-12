import { combineReducers } from 'redux'
import { reducer as formReducer } from 'redux-form'
import { routerReducer } from 'react-router-redux'

import authenticationReducer from './authentication/modules/authentication'
import flourishesReducer from './flourishes/modules/flourishes'
import tournamentsReducer from './tournaments/modules/tournaments'
import eventsReducer from './events/modules/events'
import usersReducer from './users/modules/users'
import practicesReducer from './practices/modules/practices'
import consistencyReducer from './practices/modules/consistency'
import administrationReducer from './administration/modules/administration'

const configureRootReducer = () => {
  const reducers = {
    form: formReducer,
    routing: routerReducer,
    authentication: authenticationReducer,
    flourishes: flourishesReducer,
    tournaments: tournamentsReducer,
    events: eventsReducer,
    users: usersReducer,
    practices: practicesReducer,
    consistency: consistencyReducer,
    administration: administrationReducer
  }

  const rootReducer = combineReducers(reducers)

  return rootReducer
}

export default configureRootReducer
