//Import REDUX
import * as types from '../types/events'

//Import WEBSERVICES
import { API_KEY } from 'pruebas_marvel/src/webservices/constants';
import { fetch } from 'pruebas_marvel/src/webservices/webservices'

function updateEventsList(value) {
    return {
        type: types.EVENTS_UPDATE_LIST,
        value
    }
}

function setEventsFetching(value) {
    return {
        type: types.EVENTS_SET_FETCHING,
        value
    }
}

export function updateEventSelected(value) {
    return {
        type: types.EVENTS_UPDATE_EVENT,
        value
    }
}

export function fetchEventsList(url) {
    return (dispatch, getState) => {
        dispatch(setEventsFetching(true))
        const fetchUrl = url + '?apikey=' + API_KEY;
        
        fetch(fetchUrl).then(response => {
            //console.log("fetch events response: ", response)
            dispatch(setEventsFetching(false))
            const list = response.data.results
            dispatch(updateEventsList(list))
        }).catch( error => {
            console.log('error: ', error)
            dispatch(setEventsFetching(false))
        })
    }
}