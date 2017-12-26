//Imports AXIOS
import axios from 'axios'

import * as constants from './constants'
import { API_KEY } from './constants';

export function configureAxios() {
    axios.defaults.baseURL = constants.BASE_URL
    axios.defaults.headers.common['Referer'] = 'http://jarzasa.com';
    axios.defaults.headers.post['Content-Type'] = 'application/json';
}

export function fetch(url) {
    return new Promise(function(resolve, reject) {
        axios.get(url)
        .then( response => {
            if (response.data)
                resolve(response.data);
            else
                reject(response);
        })
        .catch( error => {
            reject(error);
        });
    });
}

export function post(url, data) {
    return new Promise(function(resolve, reject) {
        axios.post(url, data)
        .then( response => {
            if (response.data)
                resolve(response.data);
            else
                reject(response);
        })
        .catch( error => {
            reject(error);
        });
    });
}