import { GET_CONTRACTOR, POST_CONTRACTOR } from '../actions/types';

const initialState = {
  contractors: []
}

export default function (state = initialState, action) {
  switch (action.type) {
    case GET_CONTRACTOR:
      return {
        ...state,
        contractors: [...action.payload]
      }
      break;
    case POST_CONTRACTOR:
      return action.payload
      break;
    default:
      return state;
  }
}