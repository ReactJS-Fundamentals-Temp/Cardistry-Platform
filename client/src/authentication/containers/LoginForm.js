import React, { Component, PropTypes } from 'react'
import { bindActionCreators } from 'redux'
import { reduxForm } from 'redux-form'
import { Form, FormGroup, FormControl, Col, ControlLabel, Button, Panel } from 'react-bootstrap'

import { loginUser } from '../modules/authentication'
import { resetError } from '../../errors'

class LoginForm extends Component {
  constructor (props) {
    super(props)

    this.handleFormSubmit = this.handleFormSubmit.bind(this)
  }

  componentWillUnmount () {
    console.log('RESET ERROR')
    this.props.resetError()
  }

  handleFormSubmit ({email, username, password, confirmPassword}) {
    this.props.loginUser({ email, username, password, confirmPassword })
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

          <FormGroup controlId='formHorizontalPassword'>

            <Col sm={12}>
              <FormControl type='password' placeholder='Password' {...password} />
              {password.touched && password.error && <div className='error'>{password.error}</div>}

            </Col>
          </FormGroup>

          <FormGroup>
            <Col sm={12}>
              <Button type='submit'>
                Login
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

  if (!values.password) {
    errors.password = 'Password is required'
  }

  return errors
}

function mapStateToProps (state) {
  return {
    errorMessage: state.errors.error
  }
}

function mapDispatchToProps (dispatch) {
  return bindActionCreators({ loginUser, resetError }, dispatch)
}

export default reduxForm({
  form: 'LoginForm',
  fields: ['email', 'password'],
  validate
}, mapStateToProps, mapDispatchToProps)(LoginForm)
