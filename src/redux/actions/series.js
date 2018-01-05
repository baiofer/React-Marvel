//Import REDUX
import * as types from '../types/series'

//Import WEBSERVICES
import { API_KEY } from 'pruebas_marvel/src/webservices/constants';
import { fetch } from 'pruebas_marvel/src/webservices/webservices'

function updateSeriesList(value) {
    return {
        type: types.SERIES_UPDATE_LIST,
        value
    }
}

function setSeriesFetching(value) {
    return {
        type: types.SERIES_SET_FETCHING,
        value
    }
}

export function updateSerieSelected(value) {
    return {
        type: types.SERIES_UPDATE_SERIE,
        value
    }
}

export function fetchSeriesList(url) {
    return (dispatch, getState) => {
        dispatch(setSeriesFetching(true))
        dispatch(updateSeriesList([]))
        const fetchUrl = url + '?apikey=' + API_KEY;
        
        fetch(fetchUrl).then(response => {
            //console.log("fetch series response: ", response)
            dispatch(setSeriesFetching(false))
            const list = response.data.results
            dispatch(updateSeriesList(list))
        }).catch( error => {
            //console.log('error: ', error)
            dispatch(setSeriesFetching(false))
        })
    }
}