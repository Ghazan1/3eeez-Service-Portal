import { combineReducers } from 'redux';
import category from './category'
import alert from './alert'
import auth from './auth'
import product from './product'

export default combineReducers({
    category,
    alert,
    auth,
    product
})