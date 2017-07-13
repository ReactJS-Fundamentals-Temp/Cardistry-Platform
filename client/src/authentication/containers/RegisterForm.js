import React, { Component, PropTypes } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { reduxForm, Field } from 'redux-form'
import { Form, FormGroup, FormControl, Col, ControlLabel, Button, Panel } from 'react-bootstrap'

import { registerUser } from '../modules/authentication'
import { resetError } from '../../errors'

class RegisterForm extends Component {
  constructor (props) {
    super(props)

    this.handleFormSubmit = this.handleFormSubmit.bind(this)
  }

  componentWillUnmount () {
    console.log('RESET ERROR')
    this.props.resetError()
  }

  handleFormSubmit ({email, username, password, confirmPassword}) {
    this.props.registerUser({ email, username, password, confirmPassword })
  }

  renderAlert () {
    if (this.props.errorMessage) {
      return (
        <div className='alert alert-danger'>
          <strong>{this.props.errorMessage}</strong>
        </div>
      )
    }
  }

  render () {
    const {fields: {email, username, password, confirmPassword}, handleSubmit} = this.props

    return (
      <Panel>
        <Form horizontal onSubmit={handleSubmit(this.handleFormSubmit)}>
          {this.renderAlert()}
          <FormGroup controlId='formHorizontalEmail'>
            <Col sm={12}>
              <FormControl type='email' placeholder='Email' {...email} />
              {email.touched && email.error && <div className='error'>{email.error}</div>}
            </Col>
          </FormGroup>

          <FormGroup controlId='formHorizontalEmail'>
            <Col sm={12}>
              <FormControl type='text' placeholder='Username' {...username} />
              {username.touched && username.error && <div className='error'>{username.error}</div>}
            </Col>
          </FormGroup>

          <FormGroup controlId='formHorizontalPassword'>
            <Col sm={12}>
              <FormControl type='password' placeholder='Password' {...password} />
              {password.touched && confirmPassword.error && <div className='error'>{confirmPassword.error}</div>}
            </Col>
          </FormGroup>

          <FormGroup controlId='formHorizontalPassword'>
            <Col sm={12}>
              <FormControl type='password' placeholder='Confirm Password' {...confirmPassword} />
            </Col>
          </FormGroup>

          <FormGroup>
            <Col sm={12}>
              <Button type='submit'>
                    Register
                    </Button>
            </Col>
          </FormGroup>
        </Form>
      </Panel>
    )
  }
}

function validate (values) {
  const errors = {}

  if (!values.email) {
    errors.email = 'Email is required'
  }

  if (!values.username) {
    errors.username = 'Username is required'
  }

  if (!values.password) {
    errors.password = 'Password is required'
  }

  if (values.password != values.confirmPassword) {
    errors.confirmPassword = 'Password and Confirm Password must match'
  }

  return errors
}

function mapStateToProps (state) {
  return {
    errorMessage: state.errors.error
  }
}

function mapDispatchToProps (dispatch) {
  return bindActionCreators({ registerUser, resetError }, dispatch)
}

export default reduxForm({
  form: 'RegisterForm',
  fields: ['email', 'username', 'password', 'confirmPassword'],
  validate
}, mapStateToProps, mapDispatchToProps)(RegisterForm)
