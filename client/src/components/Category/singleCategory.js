import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import { Row } from 'simple-flexbox'
import { Link } from 'react-router-dom'

const SingleCategory = ({ category: { _id, name } }) => {
    return (
        <Fragment>
            <li className="list-group-item">
                <Row horizontal='space-between'>
                    <h6>{name}</h6>
                    <Link to={`/category/edit-category/${_id}`} className="btn btn-secondary px-3">Edit</Link>
                </Row>
            </li>
        </Fragment>
    )
}

SingleCategory.propTypes = {
    category: PropTypes.object.isRequired,
}

export default SingleCategory
