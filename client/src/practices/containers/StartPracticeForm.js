import React, { Component } from 'react'
import { Form, FormGroup, FormControl, Col, ControlLabel, Button, Panel } from 'react-bootstrap'

import { bindActionCreators } from 'redux'
import { reduxForm } from 'redux-form'

import { startPractice, fetchCurrentUserPracticeLists, fetchPracticeTypes } from '../modules/practices'

class StartPracticeForm extends Component {
  constructor (props) {
    super(props)

    this.handleFormSubmit = this.handleFormSubmit.bind(this)
  }

  componentDidMount () {
    this.props.fetchPracticeTypes()
    this.props.fetchCurrentUserPracticeLists()
  }

  handleFormSubmit ({title, description, location}) {
    this.props.fetchCurrentUserPracticeLists()
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
    const {fields: { repetitions }, handleSubmit} = this.props

    return (
      <Panel>
        <Form horizontal onSubmit={handleSubmit(this.handleFormSubmit)}>

          <FormGroup controlId='formControlsSelect'>
            <ControlLabel>Select Practice Type</ControlLabel>
            <FormControl componentClass='select' placeholder='select'>
              { this.props.practiceTypes.map(practiceType => {
                return <option value={practiceType.name}>{practiceType.name}</option>
              })}
            </FormControl>
          </FormGroup>

          <FormGroup controlId='formControlsSelect'>
            <ControlLabel>Select Practice List</ControlLabel>
            <FormControl componentClass='select' placeholder='select'>
              { this.props.currentUserPracticeLists.map(practiceList => {
                return <option value={practiceList._id}>{practiceList.title}</option>
              })}
            </FormControl>
          </FormGroup>

          <FormGroup controlId='formHorizontalEmail'>
            <FormControl type='text' placeholder='Repetitions per Flourish' {...repetitions} />
          </FormGroup>

          <FormGroup>
            <Col smOffset={2} sm={10}>
              <Button type='submit'>
                  Start Practice
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

  if (!values.title) {
    errors.title = 'Title is required'
  }

  if (!values.description) {
    errors.description = 'Description is required'
  }

  if (!values.location) {
    errors.location = 'Location is required'
  }

    // TODO VALIDATION
  return errors
}

function mapStateToProps (state) {
  return {
    currentUserPracticeLists: state.practices.currentUserPracticeLists,
    practiceTypes: state.practices.practiceTypes,
    errorMessage: state.events.error
  }
}

function mapDispatchToProps (dispatch) {
  return bindActionCreators({ startPractice, fetchCurrentUserPracticeLists, fetchPracticeTypes }, dispatch)
}

export default reduxForm({
  form: 'StartPracticeForm',
  fields: ['repetitions'],
  validate
}, mapStateToProps, mapDispatchToProps)(StartPracticeForm)
