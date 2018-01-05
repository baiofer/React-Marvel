//Import REDUX
import * as types from '../types/series'

//Import WEBSERVICES
import { API_KEY } from 'pruebas_marvel/src/webservices/constants';
import { fetch } from 'pruebas_marvel/src/webservices/webservices'
import qs from 'qs'

function updateSeriesList(list, total) {
    return {
        type: types.SERIES_UPDATE_LIST,
        list,
        total,
    }
}

function setSeriesFetching(value) {
    return {
        type: types.SERIES_SET_FETCHING,
        value
    }
}

export function updateSeriesListOffset(value) {
    return {
        type: types.SERIES_UPDATE_LIST_OFFSET,
        value
    }
}

export function updateSerieSelected(value) {
    return {
        type: types.SERIES_UPDATE_SERIE,
        value
    }
}

export function initSeriesList() {
    return (dispatch, getState) => {
        dispatch(updateSeriesList([], 0))
        dispatch(updateSeriesListOffset(0))
        dispatch(fetchSeriesList())
    }
}

export function fetchSeriesList() {
    return (dispatch, getState) => {
        dispatch(setSeriesFetching(true))
        const state = getState()
        const url = state.characters.item.series.collectionURI
        const list = state.series.list
        const offset = state.series.offset
        const limit = 20
        const filters = {
            offset: offset,
            limit: limit,
        }
        const fetchUrl = url + '?' + qs.stringify(filters) + '&apikey=' + API_KEY;
        fetch(fetchUrl)
        .then(response => {
            //console.log("fetch series response: ", response)
            dispatch(setSeriesFetching(false))
            const newList = [...list, ...response.data.results]
            dispatch(updateSeriesList(newList, response.data.total))
        }).catch( error => {
            //console.log('error: ', error)
            dispatch(setSeriesFetching(false))
        })
    }
}