//Import REDUX
import * as types from '../types/comics'

//Import WEBSERVICES
import { API_KEY } from 'pruebas_marvel/src/webservices/constants';
import { fetch } from 'pruebas_marvel/src/webservices/webservices'
import qs from 'qs'

function updateComicsList(list, total) {
    return {
        type: types.COMICS_UPDATE_LIST,
        list,
        total,
    }
}

function setComicsFetching(value) {
    return {
        type: types.COMICS_SET_FETCHING,
        value
    }
}

export function updateComicsListOffset(value) {
    return {
        type: types.COMICS_UPDATE_LIST_OFFSET,
        value
    }
}

export function updateComicSelected(value) {
    return {
        type: types.COMICS_UPDATE_COMIC,
        value
    }
}

export function initComicsList() {
    return (dispatch, getState) => {
        dispatch(updateComicsList([], 0))
        dispatch(updateComicsListOffset(0))
        dispatch(fetchComicsList())
    }
}

export function fetchComicsList() {
    return (dispatch, getState) => {
        dispatch(setComicsFetching(true))
        const state = getState()
        const url = state.characters.item.comics.collectionURI
        const list = state.comics.list
        const offset = state.comics.offset
        const limit = 20
        const filters = {
            offset: offset,
            limit: limit,
        }
        const fetchUrl = url + '?' + qs.stringify(filters) + '&apikey=' + API_KEY;
        fetch(fetchUrl)
        .then(response => {
            //console.log("fetch comics response: ", response)
            dispatch(setComicsFetching(false))
            const newList = [...list, ...response.data.results]
            dispatch(updateComicsList(newList, response.data.total))
        }).catch( error => {
            //console.log('error: ', error)
            dispatch(setComicsFetching(false))
        })
    }
}