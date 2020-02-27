import React, { Fragment, useEffect } from 'react'
import { connect } from 'react-redux'
import { getProducts } from '../../actions/product'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import { StyleSheet, css } from 'aphrodite'
import { Row } from 'simple-flexbox'
import SingleProduct from './SingleProduct'

const styles = StyleSheet.create({
    create_product_btn: {
        padding: '5px 20px',
        textAlign: "center",
        backgroundColor: 'white',
        color: '#403e3e',
        fontFamily: 'Muli',
        fontSize: 17,
        fontWeight: 'bold',
        textDecoration: 'none',
        margin: "5px",
        border: '1px solid #9e9999 ',
        ':hover': {
            color: 'black'
        }
    }
});

const ProductList = ({ product: { products, loading}, getProducts }) => {

    useEffect(()=>{
        getProducts();
    },[])
    return (
        <Fragment>
            <Row horizontal="center">
                <Link to="/product/create-product" className={css(styles.create_product_btn)} >Create New Product</Link>
            </Row>

            <div className="container mx-auto">
            <ul className="list-group">
                <li className="list-group-item ">
                    <h2 className="text-center">Products</h2>
                </li>
                {/* <li className="list-group-item">
                    <Row horizontal='space-around'>
                        <h6>Image</h6>
                        <h6>Title</h6>
                        <h6>Category</h6>
                        <h6>Price</h6>
                        <h6></h6>
                        <h6></h6>
                    </Row>
                </li> */}
                {
                    products.map(prd => (
                       <SingleProduct key={prd._id} product={prd} />
                    ))
                }

            </ul>
        </div>

        </Fragment>
    )
}

ProductList.propTypes = {
    getProducts: PropTypes.func.isRequired,
    product: PropTypes.object.isRequired,
}

const mapStateToProps = state => ({
    product: state.product
})

export default connect(mapStateToProps, { getProducts })(ProductList)
