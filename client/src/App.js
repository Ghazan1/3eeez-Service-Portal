import React, { Fragment } from 'react';
import { Column, Row } from 'simple-flexbox';
import { StyleSheet, css } from 'aphrodite';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import SidebarComponent from './components/sidebar/SidebarComponent';
import HeaderComponent from './components/header/HeaderComponent';
import CreateCategoryComponent from './components/Category/CreateCategory';
import CategoryListComponent from './components/Category/CategoryList';
import EditCategoryComponent from './components/Category/EditCategory'
import RegisterComponent from './components/Auth/Register';
import LoginComponent from './components/Auth/Login';
import DashboardComponent from './components/Home/Dashboard';
import ProductListComponent from './components/Product/ProductList';
import CreateProductComponent from './components/Product/CreateProduct';
import EditProductComponent from './components/Product/EditProduct';
import { loadUser } from './actions/auth';
import setAuthToken from './utility/setAuthToken'

//connect redux with react
import { Provider } from 'react-redux';
import Store from './store';

import './App.css';

const styles = StyleSheet.create({
    container: {
        height: '100%',
        minHeight: '100vh'
    },
    content: {
        marginTop: 10,
    },
    mainBlock: {
        backgroundColor: '#F7F8FC',
        padding: 30
    }
});


if (localStorage.token) {
    setAuthToken(localStorage.token);
}


class App extends React.Component {

    state = {
        selectedItem: 'Dashboard'
    }

    componentDidMount() {
        window.addEventListener('resize', this.resize);
        Store.dispatch(loadUser());
    }

    componentWillUnmount() {
        window.removeEventListener('resize', this.resize);
    }

    resize = () => this.forceUpdate();

    render() {

        const { selectedItem } = this.state;

        return (
            <Provider store={Store}>
                <Router>
                    <Fragment>
                        <Route exact path='/' component={LoginComponent} />
                        <Route exact path='/register' component={RegisterComponent} />

                        {localStorage.token ? <Row className={css(styles.container)}>
                            <SidebarComponent selectedItem={selectedItem} onChange={(selectedItem) => this.setState({ selectedItem })} />
                            <Column flexGrow={1} className={css(styles.mainBlock)}>
                                <HeaderComponent title={selectedItem} />
                                <div className={css(styles.content)}>
                                    <Switch>
                                        <Route exact path='/dashboard' component={DashboardComponent} />
                                        <Route exact path='/category/createcategory' component={CreateCategoryComponent} />
                                        <Route exact path='/category/categorylist' component={CategoryListComponent} />
                                        <Route exact path='/category/edit-category/:id' component={EditCategoryComponent} />
                                        <Route exact path='/product/product-list' component={ProductListComponent} />
                                        <Route exact path='/product/create-product' component={CreateProductComponent} />
                                        <Route exact path='/product/edit-product/:id' component={EditProductComponent} />
                                    </Switch>
                                </div>
                            </Column>
                        </Row> : ''}


                    </Fragment>
                </Router>
            </Provider>
        );
    }
}

export default App;
