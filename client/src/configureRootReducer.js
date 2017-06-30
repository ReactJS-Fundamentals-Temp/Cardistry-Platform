import { combineReducers } from 'redux'
import { reducer as formReducer } from 'redux-form'
import { routerReducer } from 'react-router-redux'

const configureRootReducer = () => {
  const reducers = {
    form: formReducer,
    routing: routerReducer
  }

  const rootReducer = combineReducers(reducers)

  return rootReducer
}

export default configureRootReducer
