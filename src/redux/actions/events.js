//Import REDUX
import * as types from '../types/events'

//Import WEBSERVICES
import { API_KEY } from 'pruebas_marvel/src/webservices/constants';
import { fetch } from 'pruebas_marvel/src/webservices/webservices'
import qs from 'qs'

function updateEventsList(list, total) {
    return {
        type: types.EVENTS_UPDATE_LIST,
        list,
        total,
    }
}

function setEventsFetching(value) {
    return {
        type: types.EVENTS_SET_FETCHING,
        value
    }
}

export function updateEventsListOffset(value) {
    return {
        type: types.EVENTS_UPDATE_LIST_OFFSET,
        value
    }
}

export function updateEventSelected(value) {
    return {
        type: types.EVENTS_UPDATE_EVENT,
        value
    }
}

export function initEventsList() {
    return (dispatch, getState) => {
        dispatch(updateEventsList([], 0))
        dispatch(updateEventsListOffset(0))
        dispatch(fetchEventsList())
    }
}

export function fetchEventsList() {
    return (dispatch, getState) => {
        dispatch(setEventsFetching(true))
        const state = getState()
        const url = state.characters.item.events.collectionURI
        const list = state.events.list
        const offset = state.events.offset
        const limit = 20
        const filters = {
            offset: offset,
            limit: limit,
        }
        const fetchUrl = url + '?' + qs.stringify(filters) + '&apikey=' + API_KEY;
        fetch(fetchUrl)
        .then(response => {
            //console.log("fetch events response: ", response)
            dispatch(setEventsFetching(false))
            const newList = [...list, ...response.data.results]
            dispatch(updateEventsList(newList, response.data.total))
        }).catch( error => {
            //console.log('error: ', error)
            dispatch(setEventsFetching(false))
        })
    }
}