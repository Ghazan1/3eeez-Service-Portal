import { REGISTER_SUCCESS, REGISTER_FAIL, LOGIN_FAIL, LOGIN_SUCCESS, USER_LOADED, AUTH_ERROR } from '../actions/types';

const intialState = {
    token: localStorage.getItem('token'),
    isAuthenticated: null,
    loading: true,
    user: null
}

export default function (state = intialState, action) {

    const { type, payload } = action;

    switch (type) {
        case USER_LOADED:
            return {
                ...state,
                loading: false,
                isAuthenticated: true,
                user: payload
            }
        case REGISTER_SUCCESS:
        case LOGIN_SUCCESS:
            localStorage.setItem('token', payload.token);
            return {
                ...state,
                ...payload,
                loading: false,
                isAuthenticated: true
            }
        case REGISTER_FAIL:
        case LOGIN_FAIL:
        case AUTH_ERROR:
            localStorage.removeItem('token');
            return {
                ...state,
                token: null,
                loading: false,
                isAuthenticated: false
            }
        default:
            return state;
    }
}