import { combineReducers } from 'redux';
import jobReducer from './jobReducer';
import contractorReducer from './contractorReducer';

export default combineReducers({
  job: jobReducer,
  contractors: contractorReducer
});