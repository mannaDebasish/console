import { GET_CONTRACTOR, POST_CONTRACTOR } from './types';
import { devUrl, header } from '../../config/config';

function getAllContractors() {
    return (dispatch) => {
        return new Promise((resolve, reject) => {
            fetch(`${devUrl}contractors/`, {
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

function createPost(contractor) {
    return (dispatch) => {
        return new Promise((resolve, reject) => {
            fetch(`${devUrl}contractors/`, {
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
                    return Promise.resolve(data);
                });
        });
    }
}

export { getAllContractors, createPost };