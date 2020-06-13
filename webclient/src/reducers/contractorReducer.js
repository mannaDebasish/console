import {
    GET_CONTRACTOR, POST_CONTRACTOR, UPDATE_CONTRACTOR,
    GET_SALESMAN, POST_SALESMAN, UPDATE_SALESMAN,
    GET_CUSTOMER, POST_CUSTOMER, UPDATE_CUSTOMER,
    GET_INSURER, POST_INSURER, UPDATE_INSURER,
    GET_JOB, POST_JOB, GET_JOB_BY_ID, UPDATE_JOB
} from '../actions/types'

const initialState = {
    contractors: [],
    customers: [],
    salesmen: [],
    insurers: [],
    jobs: [],
    foundIndex: -1,
    job: {}

}

export default function (state = initialState, action) {
    switch (action.type) {
        case GET_CONTRACTOR:
            return {
                ...state,
                contractors: action.payload,
            }
            break
        case POST_CONTRACTOR:
            return {
                ...state,
                contractors: [...state.contractors, action.payload],
            }
            break
        case UPDATE_CONTRACTOR:
            state.foundIndex = state.contractors.findIndex(record => record.id == action.payload.id);
            state.foundIndex ? state.contractors[state.foundIndex] = action.payload : state.contractors;
            return {
                ...state,
                contractors: [...state.contractors],
            }
            break
        case GET_CUSTOMER:
            return {
                ...state,
                customers: action.payload,
            }
            break
        case POST_CUSTOMER:
            return {
                ...state,
                customers: [...state.customers, action.payload],
            }
            break
        case UPDATE_CUSTOMER:
            state.foundIndex = state.customers.findIndex(record => record.id == action.payload.id);
            state.foundIndex ? state.customers[state.foundIndex] = action.payload : state.customers;
            return {
                ...state,
                customers: [...state.customers],
            }
            break
        case GET_SALESMAN:
            return {
                ...state,
                salesmen: action.payload,
            }
            break
        case POST_SALESMAN:
            return {
                ...state,
                salesmen: [...state.salesmen, action.payload],
            }
            break
        case UPDATE_SALESMAN:
            state.foundIndex = state.salesmen.findIndex(record => record.id == action.payload.id);
            state.foundIndex ? state.salesmen[state.foundIndex] = action.payload : state.salesmen;
            return {
                ...state,
                salesmen: [...state.salesmen],
            }
            break
        case GET_INSURER:
            return {
                ...state,
                insurers: action.payload,
            }
            break
        case POST_INSURER:
            return {
                ...state,
                insurers: [...state.insurers, action.payload],
            }
            break
        case UPDATE_INSURER:
            state.foundIndex = state.insurers.findIndex(record => record.id == action.payload.id);
            state.foundIndex ? state.insurers[state.foundIndex] = action.payload : state.insurers;
            return {
                ...state,
                insurers: [...state.insurers],
            }
            break
        case GET_JOB:
            return {
                ...state,
                jobs: action.payload,
            }
            break
        case GET_JOB_BY_ID:
            return {
                ...state,
                job: action.payload,
            }
            break
        case POST_JOB:
            return {
                ...state,
                jobs: [...state.jobs, action.payload],
            }
            break
        case UPDATE_JOB:
            state.foundIndex = state.jobs.findIndex(record => record.id == action.payload.id);
            state.foundIndex ? state.jobs[state.foundIndex] = action.payload : state.jobs;
            return {
                ...state,
                jobs: [...state.jobs],
            }
            break
        default:
            return state
    }
}