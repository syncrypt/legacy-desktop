import { combineReducers } from 'redux';
import { routerReducer as routing } from 'react-router-redux';
import api from '../api';

let initialState = {
  selected_vault_id: null,
  sidebarHidden: false
};

function navigation(state = initialState, action) {
  switch (action.type) {
    case 'SELECT_VAULT':
      return Object.assign({}, state, {
        selected_vault_id: action.vault_id
      })
    case 'TOGGLE_SIDEBAR':
      return Object.assign({}, state, {
        sidebarHidden: !state.sidebarHidden
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
