import * as types from '../types/events'

const initialState = {
    list: [],
    item: null,
    isFetching: false,
    eventItem: null,
}

export default function reducer(state = initialState, action = {}) {
    switch (action.type) {
        case types.EVENTS_UPDATE_LIST:
            return {
                ...state,
                list: action.value
            };
        case types.CHARACTERS_UPDATE_CHARACTER:
            return {
                ...state,
                item: action.value
            };
        case types.EVENTS_SET_FETCHING:
            return {
                ...state,
                isFetching: action.value
            };
        case types.EVENTS_UPDATE_EVENT:
            return {
                ...state,
                eventItem: action.value
            };
        default:
            return state;
    }
}