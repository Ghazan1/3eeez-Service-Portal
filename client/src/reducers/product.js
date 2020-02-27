import { ADD_PRODUCT, PRODUCT_ERROR, GET_SINGLE_PRODUCT, GET_PRODUCTS } from '../actions/types'
const initialState = {
    products: [],
    product: null,
    loading: true,
    error: {}
};


export default function (state = initialState, action) {

    const { type, payload } = action;

    switch (type) {
        case ADD_PRODUCT:
            return {
                ...state,
                products: [payload, ...state.products],
                loading: false
            }
        case GET_PRODUCTS:
            return {
                ...state,
                products: payload,
                loading: false
            }
        case GET_SINGLE_PRODUCT:
            return {
                ...state,
                product: payload,
                loading: false
            }
        case PRODUCT_ERROR:
            return {
                ...state,
                loading: false,
                error: payload
            }

        default:
            return state;
    }
}