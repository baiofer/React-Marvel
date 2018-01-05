//Import REDUX
import * as types from '../types/characters'

//Import WEBSERVICES
import { API_KEY } from 'pruebas_marvel/src/webservices/constants';
import { fetch } from 'pruebas_marvel/src/webservices/webservices'
import qs from 'qs'

//Imports de REACT-NATIVE-ROUTER-FLUX
import { Actions } from 'react-native-router-flux';

function updateCharactersList(list, total) {
    return {
        type: types.CHARACTERS_UPDATE_LIST,
        list,
        total,
    }
}

function setCharactersFetching(value) {
    return {
        type: types.CHARACTERS_SET_FETCHING,
        value
    }
}

export function updateCharactersListOffset(value) {
    return {
        type: types.CHARACTERS_UPDATE_LIST_OFFSET,
        value
    }
}

export function updateCharacterSelected(value) {
    return {
        type: types.CHARACTERS_UPDATE_CHARACTER,
        value
    }
}

export function initCharactersList() {
    return (dispatch, getState) => {
        dispatch(updateCharactersList([], 0))
        dispatch(updateCharactersListOffset(0))
        dispatch(fetchCharactersList())
    }
}

export function fetchCharactersList() {
    return (dispatch, getState) => {
        dispatch(setCharactersFetching(true))
        const state = getState()
        const list = state.characters.list
        const offset = state.characters.offset
        const limit = 20
        const filters = {
            offset: offset,
            limit: limit,
        }
        const fetchUrl = '/characters?' + qs.stringify(filters) + '&apikey=' + API_KEY;
        fetch(fetchUrl)
        .then(response => {
            //console.log("fetch characters response: ", response)
            dispatch(setCharactersFetching(false))
            const newList = [...list, ...response.data.results]
            dispatch(updateCharactersList(newList, response.data.total))
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