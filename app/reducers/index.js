import { combineReducers } from 'redux';
import { routerReducer as routing } from 'react-router-redux';
import api from '../api';

const rootReducer = combineReducers(Object.assign({},
            api.reducers, {
                routing
            }));

export default rootReducer;
