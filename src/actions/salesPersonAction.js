import { GET_SEALS_PERSON, POST_SEALS_PERSON, PUT_SEALS_PERSON } from './types';
import { devUrl, header } from '../../config/config';

function getAllSealsPersons() {
    return (dispatch) => {
        return new Promise((resolve, reject) => {
            fetch(`${devUrl}saleperson/all`, {
                method: 'GET',
                headers: header
            })
                .then(res => res.json())
                .then(posts => {
                    dispatch({
                        type: GET_SEALS_PERSON,
                        payload: posts.docs
                    })
                    resolve(posts.docs)
                });
        })

    }
}

function addNewSealsPerson(salesPerson) {
    return (dispatch) => {
        return new Promise((resolve, reject) => {
            fetch(`${devUrl}saleperson/create`, {
                method: 'POST',
                headers: header,
                body: JSON.stringify(salesPerson)
            })
                .then(res => res.json())
                .then(data => {
                    dispatch({
                        type: POST_SEALS_PERSON,
                        payload: data
                    })
                    return resolve(data);
                });
        });
    }
}
function updateSealsPerson(salesPerson) {
    return (dispatch) => {
        return new Promise((resolve, reject) => {
            fetch(`${devUrl}saleperson/update/${salesPerson._id}/${salesPerson._rev}`, {
                method: 'PUT',
                headers: header,
                body: JSON.stringify(salesPerson)
            })
                .then(res => res.json())
                .then(data => {
                    dispatch({
                        type: PUT_SEALS_PERSON,
                        payload: data
                    })
                    return resolve(data);
                });
        });
    }
}

export { getAllSealsPersons, addNewSealsPerson, updateSealsPerson };