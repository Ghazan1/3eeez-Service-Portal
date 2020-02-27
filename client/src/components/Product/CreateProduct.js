import React, { Fragment, useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { getCategories } from '../../actions/category'
import { AddProduct } from '../../actions/product'
import PropTypes from 'prop-types'

const CreateProduct = ({ getCategories, category: { categories, loading }, AddProduct }) => {

    const [formData, setFormData] = useState({
        title: '',
        description: '',
        category: '',
        price: '',
        image: ''
    });

    useEffect(() => {
        getCategories();

    }, [getCategories])

    const { title, description, category, price, image } = formData;

    const onchange = e => setFormData({ ...formData, [e.target.name]: e.target.value })

    const fileHandler = e => setFormData({...formData, image: e.target.files[0] });

    const onsubmit = async e => {
        e.preventDefault();

        AddProduct({title,description, category, price, image});
    }

    return (
        <Fragment>
            <div className="container">
                <h2>Create Product</h2>
                <form onSubmit={e => onsubmit(e)}>
                    <div className="form-group">
                        <input type="text" name='title' value={title} onChange={e => onchange(e)} className="form-control bg-light" placeholder="Title" required />
                    </div>
                    <div className="form-group">
                        <textarea rows="3" type="text" name="description" value={description} onChange={e => onchange(e)} className="form-control bg-light" placeholder="Description" required />
                    </div>
                    <div className="form-group">
                        <label className="form-control bg-light">
                            <select className="bg-light" value={category} name="category" onChange={e => onchange(e)} >
                                {
                                    categories.map(ctr => (
                                        <option key={ctr._id} value={ctr.name}>{ctr.name}</option>
                                    ))
                                }
                            </select>
                        </label>
                    </div>
                    <div className="form-group">
                        <input value={price} name="price" onChange={e => onchange(e)} className="form-control bg-light" placeholder="Price" required />
                    </div>

                    <div className="form-group">
                        <input type="file" onChange={e => fileHandler(e)} className="form-control bg-light" required />
                    </div>

                    <input type="submit" className="btn btn-block btn-secondary p-2" value="Create Product" />
                </form>
            </div>
        </Fragment>
    )
}

CreateProduct.propTypes = {
    getCategories: PropTypes.func.isRequired,
    category: PropTypes.object.isRequired,
    AddProduct: PropTypes.func.isRequired
}


const mapStateToProps = state => ({
    category: state.category
})

export default connect(mapStateToProps, {AddProduct, getCategories })(CreateProduct)
