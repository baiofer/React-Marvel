//Import REDUX
import * as types from '../types/characters'

//Import WEBSERVICES
import { API_KEY } from 'pruebas_marvel/src/webservices/constants';
import { fetch } from 'pruebas_marvel/src/webservices/webservices'

function updateCharactersList(value) {
    return {
        type: types.CHARACTERS_UPDATE_LIST,
        value: value,
    }
}

export function updateCharacterSelected(value) {
    return {
        type: types.CHARACTERS_UPDATE_CHARACTER,
        value
    }
}

export function fetchCharactersList() {
    return (dispatch, getState) => {
        const fetchUrl = '/characters?apikey=' + API_KEY;
        
        fetch(fetchUrl).then(response => {
            console.log("fetch response: ", response)
            const list = response.data.results
            dispatch(updateCharactersList(list))
        }).catch( error => {
            console.log('error: ', error)
        })
    }
}