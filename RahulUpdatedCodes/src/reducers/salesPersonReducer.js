import { GET_SEALS_PERSON, POST_SEALS_PERSON, PUT_SEALS_PERSON } from '../actions/types';

const initialState = {
    salesPersons: [],
    salesPerson: {}
}

export default function (state = initialState, action) {
    switch (action.type) {
        case GET_SEALS_PERSON:
            return {
                ...state,
                salesPersons: [...action.payload]
            }
            break;
        case POST_SEALS_PERSON:
            return {
                ...state,
                salesPerson: { ...action.payload }
            }
            break;
        case PUT_SEALS_PERSON:
            return {
                ...state,
                salesPerson: { ...action.payload }
            }
            break;
        default:
            return state;
    }
}