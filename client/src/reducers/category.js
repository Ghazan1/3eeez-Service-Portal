import { ADD_CATEGORY, GET_CATEGORIES, CATEGORY_ERROR, GET_CURRENT_CATEGORY, UPDATE_CATEGORY } from '../actions/types'
const initialState = {
    categories: [],
    category: null,
    loading: true,
    error: {}
};


export default function (state = initialState, action) {

    const { type, payload } = action;

    switch (type) {
        case ADD_CATEGORY:
        case UPDATE_CATEGORY:
            return {
                ...state,
                categories: [payload, ...state.categories],
                loading: false
            }
        case GET_CURRENT_CATEGORY:
            return {
                ...state,
                category: payload,
                loading: false
            }
        case GET_CATEGORIES:
            return {
                ...state,
                categories: payload,
                loading: false
            }
        case CATEGORY_ERROR:
            return {
                ...state,
                loading: false,
                error: payload
            }

        default:
            return state;
    }
}