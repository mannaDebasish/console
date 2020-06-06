import { GET_INSURANCE_COMPANY, POST_INSURANCE_COMPANY, PUT_INSURANCE_COMPANY } from './types';
import { devUrl, header } from '../../config/config';

function getAllInsuranceCompanies() {
    return (dispatch) => {
        return new Promise((resolve, reject) => {
            fetch(`${devUrl}insurance_company/all`, {
                method: 'GET',
                headers: header
            })
                .then(res => res.json())
                .then(posts => {
                    dispatch({
                        type: GET_INSURANCE_COMPANY,
                        payload: posts.docs
                    })
                    resolve(posts.docs)
                });
        })

    }
}

function addNewInsuranceCompany(insuranceCompany) {
    return (dispatch) => {
        return new Promise((resolve, reject) => {
            fetch(`${devUrl}insurance_company/create`, {
                method: 'POST',
                headers: header,
                body: JSON.stringify(insuranceCompany)
            })
                .then(res => res.json())
                .then(data => {
                    dispatch({
                        type: POST_INSURANCE_COMPANY,
                        payload: data
                    })
                    return resolve(data);
                });
        });
    }
}
function updateInsuranceCompany(insuranceCompany) {
    return (dispatch) => {
        return new Promise((resolve, reject) => {
            fetch(`${devUrl}insurance_company/update/${insuranceCompany._id}/${insuranceCompany._rev}`, {
                method: 'PUT',
                headers: header,
                body: JSON.stringify(insuranceCompany)
            })
                .then(res => res.json())
                .then(data => {
                    dispatch({
                        type: PUT_INSURANCE_COMPANY,
                        payload: data
                    })
                    return resolve(data);
                });
        });
    }
}

export { getAllInsuranceCompanies, addNewInsuranceCompany, updateInsuranceCompany };