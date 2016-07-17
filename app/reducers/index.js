import { combineReducers } from 'redux';
import { routerReducer as routing } from 'react-router-redux';
import counter from './counter';
import api from '../api';

const rootReducer = combineReducers(Object.assign({},
            api.reducers, {
                counter,
                routing
            }));

export default rootReducer;
