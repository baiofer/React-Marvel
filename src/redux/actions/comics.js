//Import REDUX
import * as types from '../types/comics'

//Import WEBSERVICES
import { API_KEY } from 'pruebas_marvel/src/webservices/constants';
import { fetch } from 'pruebas_marvel/src/webservices/webservices'

function updateComicsList(value) {
    return {
        type: types.COMICS_UPDATE_LIST,
        value
    }
}

function setComicsFetching(value) {
    return {
        type: types.COMICS_SET_FETCHING,
        value
    }
}

export function updateComicSelected(value) {
    return {
        type: types.COMICS_UPDATE_COMIC,
        value
    }
}

export function fetchComicsList(url) {
    return (dispatch, getState) => {
        dispatch(setComicsFetching(true))
        dispatch(updateComicsList([]))
        const fetchUrl = url + '?apikey=' + API_KEY;
        
        fetch(fetchUrl).then(response => {
            //console.log("fetch comics response: ", response)
            dispatch(setComicsFetching(false))
            const list = response.data.results
            dispatch(updateComicsList(list))
        }).catch( error => {
            console.log('error: ', error)
            dispatch(setComicsFetching(false))
        })
    }
}