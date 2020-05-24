import { combineReducers } from 'redux';
import jobReducer from './jobReducer';
import contractorReducer from './contractorReducer';
import customerReducer from './customerReducer';
import salesPersonReducer from './salesPersonReducer';

export default combineReducers({
  job: jobReducer,
  contractors: contractorReducer,
  customers: customerReducer,
  salesPersons: salesPersonReducer
});