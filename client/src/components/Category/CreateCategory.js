import React, { Fragment, useState } from 'react'
import { connect } from 'react-redux'
import { AddCategory } from '../../actions/category'
import PropTypes from 'prop-types'
import Alert from '../Alert/alert'

const CreateCategory = ({ AddCategory }) => {

    const [formData, setFormData] = useState({
        name: ''
    });

    const { name } = formData;

    const onchange = e => setFormData({ ...formData, name: e.target.value })

    const onsubmit = async e => {
        e.preventDefault();

        AddCategory({ name });
    }

    // AddCategory()
    return <Fragment>
        <div className="container">
            <h2>Create Category</h2>
            <form onSubmit={e => onsubmit(e)}>
                <div className="form-group">
                    <label htmlFor="email">Category Name:</label>
                    <Alert />
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Enter Category Name"
                        onChange={e => onchange(e)}
                        value={name}
                        name="name"
                    />
                </div>
                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
        </div>
    </Fragment>;
}

CreateCategory.propTypes = {
    AddCategory: PropTypes.func.isRequired,
}

export default connect(null, { AddCategory })(CreateCategory)
