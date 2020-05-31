import { GET_CUSTOMER, POST_CUSTOMER, PUT_CUSTOMER } from './types';
import { devUrl, header } from '../../config/config';

function getAllCustomers() {
    return (dispatch) => {
        return new Promise((resolve, reject) => {
            fetch(`${devUrl}customer/all`, {
                method: 'GET',
                headers: header
            })
                .then(res => res.json())
                .then(posts => {
                    dispatch({
                        type: GET_CUSTOMER,
                        payload: posts.docs
                    })
                    resolve(posts.docs)
                });
        })

    }
}

function addNewCustomer(customer) {
    return (dispatch) => {
        return new Promise((resolve, reject) => {
            fetch(`${devUrl}customer/create`, {
                method: 'POST',
                headers: header,
                body: JSON.stringify(customer)
            })
                .then(res => res.json())
                .then(data => {
                    dispatch({
                        type: POST_CUSTOMER,
                        payload: data
                    })
                    return resolve(data);
                });
        });
    }
}
function updateCustomer(customer) {
    return (dispatch) => {
        return new Promise((resolve, reject) => {
            fetch(`${devUrl}customer/update/${customer._id}/${customer._rev}`, {
                method: 'PUT',
                headers: header,
                body: JSON.stringify(customer)
            })
                .then(res => res.json())
                .then(data => {
                    dispatch({
                        type: PUT_CUSTOMER,
                        payload: data
                    })
                    return resolve(data);
                });
        });
    }
}

export { getAllCustomers, addNewCustomer, updateCustomer };