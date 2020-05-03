import { FETCH_JOB, NEW_POST } from '../actions/types';

const initialState = {
  job: {}
}

export default function (state = initialState, action) {
  console.log(action);
  switch (action.type) {
    case FETCH_JOB:
      return Object.assign({}, state.job, action.payload)
      break;
    case NEW_POST:
      return {
        ...state,
        item: action.payload
      }
      break;
    default:
      return state;
  }
}