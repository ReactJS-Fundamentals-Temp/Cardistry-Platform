import React, { Component, PropTypes } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { reduxForm } from 'redux-form'
import { Form, FormGroup, FormControl, Col, ControlLabel, Button } from 'react-bootstrap'

import { loginUser } from '../modules/authentication';


class LoginForm extends Component {
    constructor(props) {
        super(props);

        this.handleFormSubmit = this.handleFormSubmit.bind(this);
    }

    static contextTypes = {
        router: PropTypes.object
    }

    handleFormSubmit({email, username, password, confirmPassword}) {
        this.props.loginUser({ email, username, password, confirmPassword });
    }

    renderAlert() {
        if (this.props.errorMessage) {
            return (
                <div className='alert alert-danger'>
                    <strong>{this.props.errorMessage}</strong>
                </div>
            );
        }
    }


    render() {
        const {fields: {email, username, password, confirmPassword}, handleSubmit} = this.props;

        return (
        <Form horizontal onSubmit={handleSubmit(this.handleFormSubmit)}>
            <FormGroup controlId="formHorizontalEmail">
            <Col componentClass={ControlLabel} sm={2}>
                Email
            </Col>
            <Col sm={10}>
                <FormControl type="email" placeholder="Email" {...email} />
            </Col>
            </FormGroup>

            <FormGroup controlId="formHorizontalPassword">
            <Col componentClass={ControlLabel} sm={2}>
                Password
            </Col>
            <Col sm={10}>
                <FormControl type="password" placeholder="Password" {...password} />
            </Col>
            </FormGroup>

            <FormGroup>
            <Col smOffset={2} sm={10}>
                <Button type="submit">
                Login
                </Button>
            </Col>
            </FormGroup>
        </Form>
        )
    }
}


function validate(values) {
    const errors = {};

    if (!values.email) {
        errors.email = 'Email is required';
    }

    if (!values.password) {
        errors.password = 'Password is required';
    }

    return errors;
}

function mapStateToProps(state) {
    return {
        errorMessage: state.authentication.error
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({ loginUser }, dispatch);
}

export default reduxForm({
    form: 'LoginForm',
    fields: ['email', 'password'],
    validate
}, mapStateToProps, mapDispatchToProps)(LoginForm)
