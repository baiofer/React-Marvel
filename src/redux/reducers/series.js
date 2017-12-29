import * as types from '../types/series'

const initialState = {
    list: [],
    item: null,
    isFetching: false
}

export default function reducer(state = initialState, action = {}) {
    switch (action.type) {
        case types.SERIES_UPDATE_LIST:
            return {
                ...state,
                list: action.value
            };
        case types.CHARACTERS_UPDATE_CHARACTER:
            return {
                ...state,
                item: action.value
            };
        case types.SERIES_SET_FETCHING:
            return {
                ...state,
                isFetching: action.value
            };
        default:
            return state;
    }
}