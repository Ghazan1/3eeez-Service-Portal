import React, { Fragment, useState, useEffect } from 'react'
import axios from 'axios'
import { connect } from 'react-redux'
import { getProduct } from '../../actions/product'
import { getCategories } from '../../actions/category'
import PropTypes from 'prop-types'
import Alert from '../Alert/alert'


const EditProduct = ({ product: { product, loading },category:{categories}, getProduct, match, history }) => {

    const [formData, setFormData] = useState({
        title: '',
        description: '',
        category: '',
        price: '',
        image: ''
    });

    const productId = match.params.id;

    // const fetchData = async () => {
    //     try {
    //         const res = await axios.get(`/api/admin/category/${categoryId}`);
    //         const data = await res.data;
    //         return data;
    //     } catch (error) {
    //         console.log(error);
    //         throw error;
    //     }
    // };


    useEffect(() => {
        // fetchData()
        // .then(data => {
        //     setFormData({
        //         name: data.name ? data.name : ''
        //     })
        // })
        // .catch(error => {
        //     console.warn(JSON.stringify(error, null, 2));
        // });

        getProduct(productId);

        setFormData({
            title: loading || !product.title ? '' : product.title,
            description: loading || !product.description ? '' : product.description,
            category: loading || !product.category ? '' : product.category,
            price: loading || !product.price ? '' : product.price,
            image: loading || !product.image ? '' : product.image,
        });

    }, []);

    const { title, description, category, price, image } = formData;

    const onchange = e => setFormData({ ...formData, name: e.target.value })
    const fileHandler = e => setFormData({...formData, image: e.target.files[0] });


    // const onsubmit = async e => {
    //     e.preventDefault();

    //     updateCategory(name, categoryId);

    // }

    // AddCategory()
    return <Fragment>
        <div className="container">
            <h2>Edit Product</h2>
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
                    <input type="file" onChange={e => fileHandler(e)} className="form-control bg-light" required value={image}/>
                </div>

                <input type="submit" className="btn btn-block btn-secondary p-2" value="Create Product" />
            </form>
        </div>
    </Fragment>;
}

EditProduct.propTypes = {
    getProduct: PropTypes.func.isRequired,
    getCategories:PropTypes.func.isRequired,
    category: PropTypes.object.isRequired,
    product: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    product: state.product,
    category: state.category
})

export default connect(mapStateToProps, { getProduct,getCategories })(EditProduct)
