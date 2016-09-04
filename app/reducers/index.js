import { combineReducers } from 'redux';
import { routerReducer as routing } from 'react-router-redux';
import api from '../api';

function navigation(state = { selected_vault_id: null }, action) {
  switch (action.type) {
    case 'SELECT_VAULT':
      return Object.assign({}, state, {
        selected_vault_id: action.vault_id
      })
    default:
      return state
  }
}

const rootReducer = combineReducers(Object.assign({},
            api.reducers, {
                routing,
                navigation
            }));

export default rootReducer;
