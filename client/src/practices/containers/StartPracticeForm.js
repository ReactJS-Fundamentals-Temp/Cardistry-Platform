import React, { Component } from 'react'
import { Form, FormGroup, FormControl, Col, ControlLabel, Button, Panel } from 'react-bootstrap'
import { browserHistory } from 'react-router'
import { bindActionCreators } from 'redux'
import { reduxForm } from 'redux-form'

import { startPractice, fetchCurrentUserPracticeLists, fetchPracticeTypes } from '../modules/practices'

class StartPracticeForm extends Component {
  constructor (props) {
    super(props)

    this.state = {
      selectedPracticeType: null,
      selectedPracticeTypeName: null,
      selectedPracticeList: null
    }

    this.handleFormSubmit = this.handleFormSubmit.bind(this)
    this.selectPracticeType = this.selectPracticeType.bind(this)
    this.selectPracticeList = this.selectPracticeList.bind(this)
  }

  componentDidMount () {
    this.props.fetchPracticeTypes()
    this.props.fetchCurrentUserPracticeLists()

    console.log(this.props)
  }

  componentWillReceiveProps (nextProps) {
    this.setState({
      selectedPracticeType: nextProps.practiceTypes[0]._id,
      selectedPracticeTypeName: nextProps.practiceTypes[0].name,
      selectedPracticeList: nextProps.currentUserPracticeLists[0]._id || null
    })
  }

  selectPracticeType (event) {
    console.log(event.target.value)
    const selectedPracticeType = event.target.value
    const selectedPracticeTypeName = event.target.getAttribute('key')

    console.log(selectedPracticeTypeName)

    this.setState({
      selectedPracticeType,
      selectedPracticeTypeName
    })
  }

  selectPracticeList (event) {
    console.log(event.target.value)
    const selectedPracticeList = event.target.value

    this.setState({
      selectedPracticeList
    })
  }

  handleFormSubmit ({requiredConsistencyRepetitions}) {
    console.log(this.state.selectedPracticeTypeName)
    this.props.startPractice({
      selectedPracticeType: this.state.selectedPracticeType,
      selectedPracticeTypeName: this.state.selectedPracticeTypeName,
      selectedPracticeList: this.state.selectedPracticeList,
      requiredConsistencyRepetitions
    })
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
    const {fields: { requiredConsistencyRepetitions }, handleSubmit} = this.props

    console.log(this.props.currentUserPracticeLists)
    if (this.props.currentUserPracticeLists.length < 1) {
      browserHistory.push('/user/practices/practice-lists/create')
    }

    return (
      <Panel>
        <Form horizontal onSubmit={handleSubmit(this.handleFormSubmit)}>

          <FormGroup controlId='formControlsSelect'>
            <Col sm={12}>
              <ControlLabel>Select Practice Type</ControlLabel>
              <FormControl componentClass='select' placeholder='select' onChange={this.selectPracticeType}>
                { this.props.practiceTypes.map(practiceType => {
                  return <option key={practiceType.name} value={practiceType._id}>{practiceType.name}</option>
                })}
              </FormControl>
            </Col>
          </FormGroup>

          <FormGroup controlId='formControlsSelect'>
            <Col sm={12}>
              <ControlLabel>Select Practice List</ControlLabel>
              <FormControl componentClass='select' placeholder='select' onChange={this.selectPracticeList}>
                { this.props.currentUserPracticeLists.map(practiceList => {
                  return <option key={practiceList._id} value={practiceList._id}>{practiceList.title}</option>
                })}
              </FormControl>
            </Col>
          </FormGroup>

          <FormGroup controlId='formHorizontalRepetitions'>
            <Col sm={12}>
              <FormControl type='text' placeholder='Repetitions per Flourish' {...requiredConsistencyRepetitions} />
              {requiredConsistencyRepetitions.touched && requiredConsistencyRepetitions.error && <div className='error'>{requiredConsistencyRepetitions.error}</div>}

            </Col>
          </FormGroup>

          <FormGroup>
            <Col sm={12}>
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

  if (!values.requiredConsistencyRepetitions) {
    errors.requiredConsistencyRepetitions = 'Repetitions per Flourish is required'
  }

    // TODO VALIDATION
  return errors
}

function mapStateToProps (state) {
  return {
    currentUserPracticeLists: state.practices.currentUserPracticeLists,
    practiceTypes: state.practices.practiceTypes,
    errorMessage: state.errors.error
  }
}

function mapDispatchToProps (dispatch) {
  return bindActionCreators({ startPractice, fetchCurrentUserPracticeLists, fetchPracticeTypes }, dispatch)
}

export default reduxForm({
  form: 'StartPracticeForm',
  fields: ['requiredConsistencyRepetitions'],
  validate
}, mapStateToProps, mapDispatchToProps)(StartPracticeForm)
