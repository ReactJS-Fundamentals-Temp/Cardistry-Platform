import React, { Component, PropTypes } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { reduxForm, Field } from 'redux-form'
import { Form, FormGroup, FormControl, Col, ControlLabel, Button } from 'react-bootstrap'

import { registerUser } from '../modules/authentication'


class RegisterForm extends Component {
    constructor(props) {
        super(props)

        this.handleFormSubmit = this.handleFormSubmit.bind(this)
    }

    static contextTypes = {
        router: PropTypes.object
    }

    handleFormSubmit({email, username, password, confirmPassword}) {
        console.log('Submit')
        this.props.registerUser({ email, username, password, confirmPassword });
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
                <FormControl type="email" placeholder="Email" {...email}/>
            </Col>
            </FormGroup>

            <FormGroup controlId="formHorizontalEmail">
            <Col componentClass={ControlLabel} sm={2}>
                Username
            </Col>
            <Col sm={10}>
                <FormControl type="text" placeholder="Username" {...username}/>
            </Col>
            </FormGroup>

            <FormGroup controlId="formHorizontalPassword">
            <Col componentClass={ControlLabel} sm={2}>
                Password
            </Col>
            <Col sm={10}>
                <FormControl type="password" placeholder="Password" {...password}/>
            </Col>
            </FormGroup>

              <FormGroup controlId="formHorizontalPassword">
            <Col componentClass={ControlLabel} sm={2}>
                Confirm Password
            </Col>
            <Col sm={10}>
                <FormControl type="password" placeholder="Confirm Password" {...confirmPassword}/>
            </Col>
            </FormGroup>

            <FormGroup>
            <Col smOffset={2} sm={10}>
                <Button type="submit">
                Register
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

    if (!values.username) {
        errors.username = 'Username is required';
    }

    if (!values.password) {
        errors.password = 'Password is required';
    }

    if (values.password != values.confirmPassword) {
        errors.confirmPassword = 'Password and Confirm Password must match';
    }

    return errors;
}

function mapStateToProps(state) {
    return {
        errorMessage: state.authentication.error
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({ registerUser }, dispatch);
}

export default reduxForm({
    form: 'RegisterForm',
    fields: ['email', 'username', 'password', 'confirmPassword'],
    validate
}, mapStateToProps, mapDispatchToProps)(RegisterForm)
