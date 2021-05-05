import { combineReducers } from 'redux';
import client from './clientInfo';

const rootReducer = {
  client,
};

export default combineReducers(rootReducer);
