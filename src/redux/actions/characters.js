//Import REDUX
import * as types from '../types/characters'

//Import WEBSERVICES
import { API_KEY } from 'pruebas_marvel/src/webservices/constants';
import { fetch } from 'pruebas_marvel/src/webservices/webservices'

//Imports de REACT-NATIVE-ROUTER-FLUX
import { Actions } from 'react-native-router-flux';

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
        dispatch(updateCharactersList([]))
        const fetchUrl = '/characters?apikey=' + API_KEY;
        
        fetch(fetchUrl).then(response => {
            //console.log("fetch character response: ", response)
            dispatch(setCharactersFetching(false))
            const list = response.data.results
            dispatch(updateCharactersList(list))
        }).catch( error => {
            //console.log('error: ', error)
            dispatch(setCharactersFetching(false))
        })
    }
}

export function postCharacter(character) {
    return (dispatch, getState) => {
        const state = getState()
        const list = state.characters.list
        //Aquí hariamos el post(uri, character)
        Actions.pop()
    }
}