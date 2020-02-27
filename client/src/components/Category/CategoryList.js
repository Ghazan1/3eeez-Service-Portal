import React, { Fragment, useEffect } from 'react'
import { connect } from 'react-redux'
import { getCategories } from '../../actions/category'
import SingleCategory from './singleCategory'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import { StyleSheet, css } from 'aphrodite'
import { Row } from 'simple-flexbox'

const styles = StyleSheet.create({
    create_category_btn: {
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


const CategoryList = ({ getCategories, category: { categories, loading } }) => {

    useEffect(() => {
        getCategories();

    }, [getCategories])

    return loading ? '' : <Fragment>
        <Row horizontal="center">
            <Link to="/category/createcategory" className={css(styles.create_category_btn)} >Create New Category</Link>
        </Row>

        <div className="container mx-auto">
            <ul className="list-group">
                <li className="list-group-item">
                    <h2>Categories</h2>
                </li>
                <li className="list-group-item">
                    <Row horizontal='space-between'>
                        <h6>Name</h6>
                        <h6 className="pr-2">Update</h6>
                    </Row>
                </li>
                {
                    categories.map(ctr => (
                        <SingleCategory key={ctr._id} category={ctr} />
                    ))
                }

            </ul>
        </div>

    </Fragment>;
}

CategoryList.propTypes = {
    getCategories: PropTypes.func.isRequired,
    category: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    category: state.category
})

export default connect(mapStateToProps, { getCategories })(CategoryList)
