import { combineReducers } from 'redux';
import { modulesReducer } from './modules';

export const rootReducer = combineReducers({
  "MODULES": modulesReducer,
});