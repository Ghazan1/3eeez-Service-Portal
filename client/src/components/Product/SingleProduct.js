import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import { Row } from 'simple-flexbox'
import { Link } from 'react-router-dom'

const SingleProduct = ({ product: { _id, title, imageUrl, category, price } }) => {
    console.log(imageUrl);

    return (
        <Fragment>
            <li className="list-group-item">
                <Row horizontal='space-around'>
                    <img src={`http://localhost:5000/${imageUrl}`} width="50" height="30" />
                    <h6>{title}</h6>
                    <h6>{category}</h6>
                    <h6>{price}</h6>
                    <Link to={`/product/edit-product/${_id}`} className="btn btn-secondary">Edit</Link>
                    <Link to={`/product/delete-product/${_id}`} className="btn btn-secondary">Delete</Link>
                </Row>
            </li>
        </Fragment>
    )
}

SingleProduct.propTypes = {
    product: PropTypes.object.isRequired,
}

export default SingleProduct
