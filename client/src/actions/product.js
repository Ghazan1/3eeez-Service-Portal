import { ADD_PRODUCT, PRODUCT_ERROR, GET_PRODUCTS, GET_SINGLE_PRODUCT } from "./types";
import axios from 'axios';
import { setAlert } from './alert';

export const AddProduct = ({ title,description,category, price, image }) => async dispatch => {
    const formData = new FormData();

    formData.append("title", title);
    formData.append("description", description);
    formData.append("category", category);
    formData.append("price", price);
    formData.append("image", image);

    try {
        const response = await axios.post('/api/admin/product', formData);

        dispatch({
            type: ADD_PRODUCT,
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

//get all products
export const getProducts = () => async dispatch => {
    
    try {
        const res = await axios.get('/api/admin/product/all');
        dispatch({
            type: GET_PRODUCTS,
            payload: res.data

        })
    } catch (err) {
        dispatch({
            type: PRODUCT_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status }
        });
    }
}

//get all products
export const getProduct = productId => async dispatch => {
    
    try {
        const res = await axios.get(`/api/admin/product/${productId}`);
        dispatch({
            type: GET_SINGLE_PRODUCT,
            payload: res.data

        })
    } catch (err) {
        dispatch({
            type: PRODUCT_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status }
        });
    }
}