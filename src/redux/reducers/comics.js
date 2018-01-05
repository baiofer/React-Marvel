import * as types from '../types/comics'

const initialState = {
    list: [],
    item: null,
    isFetching: false,
    comicItem: null,
    offset: 0,
    total:0,
}

export default function reducer(state = initialState, action = {}) {
    switch (action.type) {
        case types.COMICS_UPDATE_LIST:
            return {
                ...state,
                list: action.list,
                total: action.total,
            };
        case types.CHARACTERS_UPDATE_CHARACTER:
            return {
                ...state,
                item: action.value
            };
        case types.COMICS_UPDATE_LIST_OFFSET:
            return {
                ...state,
                offset: action.value
            };
        case types.COMICS_SET_FETCHING:
            return {
                ...state,
                isFetching: action.value
            };
        case types.COMICS_UPDATE_COMIC:
            return {
                ...state,
                comicItem: action.value
            };
        default:
            return state;
    }
}