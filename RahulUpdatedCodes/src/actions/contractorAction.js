import { GET_CONTRACTOR, POST_CONTRACTOR, PUT_CONTRACTOR } from './types';
import { devUrl, header } from '../../config/config';

function getAllContractors() {
    return (dispatch) => {
        return new Promise((resolve, reject) => {
            fetch(`${devUrl}contractor/all`, {
                method: 'GET',
                headers: header
            })
                .then(res => res.json())
                .then(posts => {
                    dispatch({
                        type: GET_CONTRACTOR,
                        payload: posts.docs
                    })
                    resolve(posts.docs)
                });
        })

    }
}

function addNewContractor(contractor) {
    return (dispatch) => {
        return new Promise((resolve, reject) => {
            fetch(`${devUrl}contractor/create`, {
                method: 'POST',
                headers: header,
                body: JSON.stringify(contractor)
            })
                .then(res => res.json())
                .then(data => {
                    dispatch({
                        type: POST_CONTRACTOR,
                        payload: data
                    })
                    return resolve(data);
                });
        });
    }
}
function updateContractor(contractor) {
    return (dispatch) => {
        return new Promise((resolve, reject) => {
            fetch(`${devUrl}contractor/update/${contractor._id}/${contractor._rev}`, {
                method: 'PUT',
                headers: header,
                body: JSON.stringify(contractor)
            })
                .then(res => res.json())
                .then(data => {
                    dispatch({
                        type: PUT_CONTRACTOR,
                        payload: data
                    })
                    return resolve(data);
                });
        });
    }
}

export { getAllContractors, addNewContractor, updateContractor };