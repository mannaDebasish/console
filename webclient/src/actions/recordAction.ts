import {
    GET_CONTRACTOR, POST_CONTRACTOR, UPDATE_CONTRACTOR,
    GET_SALESMAN, POST_SALESMAN, UPDATE_SALESMAN,
    GET_CUSTOMER, POST_CUSTOMER, UPDATE_CUSTOMER,
    GET_INSURER, POST_INSURER, UPDATE_INSURER,
    GET_JOB, POST_JOB, GET_JOB_BY_ID, UPDATE_JOB
} from './types'
import { devUrl, header } from '../../config/config'

export function genGetAll(table_name, TYPE) {
    return function () {
        return dispatch => {
            return new Promise((resolve, reject) => {
                fetch(`${devUrl}${table_name}/all`, {
                    method: 'GET',
                    headers: header,
                })
                    .then(res => res.json())
                    .then(posts => {
                        dispatch({
                            type: TYPE,
                            payload: posts.rows,
                        })
                        resolve(posts.docs)
                    })
            })
        }
    }
}

function genCreatePost(table_name, TYPE) {
    return function (record) {
        let new_record = record;
        if (table_name === 'job') {
            new_record.current_task = "Expenses";
            new_record.last_completed_task = "";
            new_record.status = "new";
            new_record.expenses = [];
            new_record.State = [];
        }
        return dispatch => {
            return new Promise((resolve, reject) => {
                fetch(`${devUrl}${table_name}/create`, {
                    method: 'POST',
                    headers: header,
                    body: JSON.stringify(new_record),
                })
                    .then(res => res.json())
                    .then(data => {
                        let newRecord = { id: data.id, key: data.id, value: { rev: data.rev }, doc: { _id: data.id, _rev: data.rev, ...new_record } };
                        dispatch({
                            type: TYPE,
                            payload: newRecord,
                        })
                        return Promise.resolve(data)
                    })
            })
        }
    }
}

function genUpdatePost(table_name, TYPE) {
    return function (record) {
        return dispatch => {
            return new Promise((resolve, reject) => {
                fetch(`${devUrl}${table_name}/update/${record._id}/${record._rev}`, {
                    method: 'PUT',
                    headers: header,
                    body: JSON.stringify(record),
                })
                    .then(res => res.json())
                    .then(data => {
                        let newRecord = { id: data.id, key: data.id, value: { rev: data.rev }, doc: { _id: data.id, _rev: data.rev, ...record } };
                        dispatch({
                            type: TYPE,
                            payload: newRecord,
                        })
                        return Promise.resolve(data)
                    })
            })
        }
    }
}

function genGetSingle(table_name, TYPE) {
    return function (recordId) {
        return dispatch => {
            return new Promise((resolve, reject) => {
                fetch(`${devUrl}${table_name}/single/${recordId}`, {
                    method: 'GET',
                    headers: header
                })
                    .then(res => res.json())
                    .then(data => {
                        dispatch({
                            type: TYPE,
                            payload: data,
                        })
                        return Promise.resolve(data)
                    })
            })
        }
    }
}


export var getAllContractors = genGetAll('contractor', GET_CONTRACTOR)
export var createContractorPost = genCreatePost('contractor', POST_CONTRACTOR)
export var updateContractor = genUpdatePost('contractor', UPDATE_CONTRACTOR);

export var getAllCustomers = genGetAll('customer', GET_CUSTOMER)
export var createCustomerPost = genCreatePost('customer', POST_CUSTOMER)
export var updateCustomer = genUpdatePost('contractor', UPDATE_CUSTOMER);

export var getAllSalesmen = genGetAll('salesmen', GET_SALESMAN)
export var createSalesmanPost = genCreatePost('salesmen', POST_SALESMAN)
export var updateSalesmen = genUpdatePost('salesmen', UPDATE_SALESMAN);

export var getAllInsurers = genGetAll('insurer', GET_INSURER)
export var createInsurerPost = genCreatePost('insurer', POST_INSURER)
export var updateInsure = genUpdatePost('insurer', UPDATE_INSURER);

export var getAllJobs = genGetAll('job', GET_JOB)
export var createJobPost = genCreatePost('job', POST_JOB)
export var getSingleJobPost = genGetSingle('job', GET_JOB_BY_ID)
export var updateJob = genUpdatePost('job', UPDATE_JOB)