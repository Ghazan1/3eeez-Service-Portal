import React, { Fragment, useState, useEffect } from 'react'
import axios from 'axios'
import { connect } from 'react-redux'
import { updateCategory, getCurrentCategory } from '../../actions/category'
import PropTypes from 'prop-types'
import Alert from '../Alert/alert'


const EditCategory = ({ category: { category, loading }, updateCategory, getCurrentCategory, match, history }) => {

    const [formData, setFormData] = useState({
        name: ''
    });

    const categoryId = match.params.id;

    const fetchData = async () => {
        try {
            const res = await axios.get(`/api/admin/category/${categoryId}`);
            const data = await res.data;
            return data;
        } catch (error) {
            console.log(error);
            throw error;
        }
    };


    useEffect(() => {
        fetchData()
        .then(data => {
            setFormData({
                name: data.name ? data.name : ''
            })
        })
        .catch(error => {
            console.warn(JSON.stringify(error, null, 2));
        });
        // getCurrentCategory(categoryId);
        // setFormData({
        //     name: loading || !category.name ? '' : category.name
        // });

    }, []);

    const { name } = formData;

    const onchange = e => setFormData({ ...formData, name: e.target.value })

    const onsubmit = async e => {
        e.preventDefault();

        updateCategory(name, categoryId);

    }

    // AddCategory()
    return  <Fragment>
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

EditCategory.propTypes = {
    updateCategory: PropTypes.func.isRequired,
    getCurrentCategory: PropTypes.func.isRequired,
    category: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    category: state.category
})

export default connect(mapStateToProps, { updateCategory, getCurrentCategory })(EditCategory)
