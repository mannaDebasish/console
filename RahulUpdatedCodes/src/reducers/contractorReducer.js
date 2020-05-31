import { GET_CONTRACTOR, POST_CONTRACTOR, PUT_CONTRACTOR } from '../actions/types';

const initialState = {
  contractors: [],
  contractor: {}
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
      return {
        ...state,
        contractor: { ...action.payload }
      }
      break;
    case PUT_CONTRACTOR:
      return {
        ...state,
        contractor: { ...action.payload }
      }
      break;
    default:
      return state;
  }
}