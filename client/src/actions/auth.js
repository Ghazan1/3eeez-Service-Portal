import axios from 'axios';
import { REGISTER_SUCCESS, REGISTER_FAIL, USER_LOADED, AUTH_ERROR, LOGIN_FAIL, LOGIN_SUCCESS, LOGOUT } from '../actions/types';
import { setAlert } from './alert';
import setAuthToken from '../utility/setAuthToken';

export const loadUser = () => async dispatch => {
    if (localStorage.token) {
        setAuthToken(localStorage.token);
    }

    try {
        const res = await axios.get('/api/admin/auth');
        dispatch({
            type: USER_LOADED,
            payload: res.data
        })
    } catch (error) {
        dispatch({
            type: AUTH_ERROR
        })
    }
}

export const register = ({ name, email, password }) => async dispatch => {

    const config = {
        headers: {
            "Content-Type": "application/json"
        }
    }

    const body = JSON.stringify({ name, email, password });

    try {
        const res = await axios.post('/api/admin/auth', body, config);
        // console.log(res.data);   
        dispatch({
            type: REGISTER_SUCCESS,
            payload: res.data
        });

        dispatch(loadUser());


    } catch (err) {
        const errors = err.response.data.errors;

        if (errors) {
            errors.forEach(err => dispatch(setAlert(err.msg, 'danger')));
        }

        dispatch({
            type: REGISTER_FAIL
        })
    }
}


export const login = ({email, password}) => async dispatch => {

    const config = {
        headers: {
            "Content-Type": "application/json"
        }
    }

    const body = JSON.stringify({ email, password });

    try {
        const res = await axios.post('/api/admin/auth/login', body, config);
        console.log(res.data);   
        dispatch({
            type: LOGIN_SUCCESS,
            payload: res.data
        });

        dispatch(loadUser());

    } catch (err) {
        const errors = err.response.data.errors;

        if (errors) {
            errors.forEach(err => dispatch(setAlert(err.msg, 'danger')));
        }
        dispatch({
            type: LOGIN_FAIL
        })
    }
}

//logout

// export const logout = () => dispatch => {
//     dispatch({
//         type: LOGOUT
//     })
//     dispatch({
//         type: CLEAR_PROFILE
//     })
// }