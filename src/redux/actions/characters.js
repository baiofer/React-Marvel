//Import REDUX
import * as types from '../types/characters'

//Import WEBSERVICES
import { API_KEY } from 'pruebas_marvel/src/webservices/constants';
import { fetch } from 'pruebas_marvel/src/webservices/webservices'

function updateCharactersList(value) {
    return {
        type: types.CHARACTERS_UPDATE_LIST,
        value
    }
}

function setCharactersFetching(value) {
    return {
        type: types.CHARACTERS_SET_FETCHING,
        value
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
        dispatch(setCharactersFetching(true))
        const fetchUrl = '/characters?apikey=' + API_KEY;
        
        fetch(fetchUrl).then(response => {
            console.log("fetch character response: ", response)
            dispatch(setCharactersFetching(false))
            const list = response.data.results
            dispatch(updateCharactersList(list))
        }).catch( error => {
            //console.log('error: ', error)
            dispatch(setCharactersFetching(false))
        })
    }
}