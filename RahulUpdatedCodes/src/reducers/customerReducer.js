import { GET_CUSTOMER, POST_CUSTOMER, PUT_CUSTOMER } from '../actions/types';

const initialState = {
    customers: [],
    customer: {}
}

export default function (state = initialState, action) {
    switch (action.type) {
        case GET_CUSTOMER:
            return {
                ...state,
                customers: [...action.payload]
            }
            break;
        case POST_CUSTOMER:
            return {
                ...state,
                customer: { ...action.payload }
            }
            break;
        case PUT_CUSTOMER:
            return {
                ...state,
                customer: { ...action.payload }
            }
            break;
        default:
            return state;
    }
}