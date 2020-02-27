import { ADD_CATEGORY, GET_CATEGORIES, CATEGORY_ERROR, GET_CURRENT_CATEGORY, UPDATE_CATEGORY } from "./types";
import axios from 'axios';
import { setAlert } from './alert';

export const AddCategory = ({ name }) => async dispatch => {

    const config = {
        headers: {
            "Content-Type": "application/json"
        }
    }

    const body = JSON.stringify({ name });

    console.log(name);


    try {

        const response = await axios.post('/api/admin/category', body, config);

        dispatch({
            type: ADD_CATEGORY,
            payload: response.data
        })

    } catch (err) {
        const errors = err.response.data.errors;

        if (errors) {
            errors.forEach(err => {
                dispatch(setAlert(err.msg, 'danger'))
            });
        }
    }
};

//get all categories
export const getCategories = () => async dispatch => {

    try {
        const res = await axios.get('/api/admin/category/all');
        dispatch({
            type: GET_CATEGORIES,
            payload: res.data

        })
    } catch (err) {
        dispatch({
            type: CATEGORY_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status }
        });
    }
}

//get single category
export const getCurrentCategory = categoryId => async dispatch => {

    try {
        const res = await axios.get(`/api/admin/category/${categoryId}`);
        console.log(res);

        dispatch({
            type: GET_CURRENT_CATEGORY,
            payload: res.data
        })
    } catch (err) {
        dispatch({
            type: CATEGORY_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status }
        });
    }
}

export const updateCategory = ( name , categoryId) => async dispatch => {
    const config = {
        headers: {
            "Content-Type": "application/json"
        }
    }

    const body = JSON.stringify({ name });

    try {
        const response = await axios.put(`/api/admin/category/${categoryId}`, body, config);

        dispatch({
            type: UPDATE_CATEGORY,
            payload: response.data
        })

    } catch (err) {
        const errors = err.response.data.errors;

        if (errors) {
            errors.forEach(err => {
                dispatch(setAlert(err.msg, 'danger'))
            });
        }
    }
}
