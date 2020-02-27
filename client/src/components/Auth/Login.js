import React, { Fragment, useState } from 'react'
import PropTypes from 'prop-types'
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { login } from '../../actions/auth';
import Alert from '../Alert/alert';


const Login = ({ isAuthenticated, login }) => {

    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });

    const { email, password } = formData;

    const onchange = e => setFormData({ ...formData, [e.target.name]: e.target.value })

    const onsubmit = async e => {
        e.preventDefault();

        login({email,password});
    }

    if (isAuthenticated) {
        return <Redirect to="/dashboard" />
    }


    return (
        <Fragment>
            <section className="HeroSection">
                <div className="container h-100">
                    <div className="row justify-content-center align-items-center h-100">
                        <div className="login">
                            <h4 className="d-flex justify-content-center">3eeez Automotive Store & Portal</h4>
                            <label className="d-flex justify-content-center text-muted">Sign In Admin</label>
                            <Alert />
                            <form onSubmit={e => onsubmit(e)}>
                                <div className="form-group">
                                    <input type="email" name="email" value={email} onChange={e => onchange(e)} className="form-control bg-light" placeholder="Email" />
                                </div>

                                <div className="form-group">
                                    <input value={password} name="password" onChange={e => onchange(e)} className="form-control bg-light" type="password" placeholder="Password" />
                                </div>

                                <input type="submit" className="btn btn-block btn-secondary p-2" value="Login" />

                                <label className="d-flex justify-content-center my-2 text-muted">Already have an account?</label>
                                <Link to="/register" className="signup">Sign Up</Link>
                            </form>

                        </div>
                    </div>
                </div>
            </section>
        </Fragment>
    )
}

Login.propTypes = {
    login: PropTypes.func.isRequired,
    isAuthenticated: PropTypes.bool
}

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated
})


export default connect(mapStateToProps, { login })(Login);
