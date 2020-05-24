import { GET_INSURANCE_COMPANY, POST_INSURANCE_COMPANY, PUT_INSURANCE_COMPANY } from '../actions/types';

const initialState = {
    companies: [],
    company: {}
}

export default function (state = initialState, action) {
    switch (action.type) {
        case GET_INSURANCE_COMPANY:
            return {
                ...state,
                companies: [...action.payload]
            }
            break;
        case POST_INSURANCE_COMPANY:
            return {
                ...state,
                company: { ...action.payload }
            }
            break;
        case PUT_INSURANCE_COMPANY:
            return {
                ...state,
                company: { ...action.payload }
            }
            break;
        default:
            return state;
    }
}