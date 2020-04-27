import { combineReducers } from 'redux';

import nav from './navigation';
import clients from './client';

export default client => combineReducers({
  apollo: client.reducer(),
  nav,
  clients
});