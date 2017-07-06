import React, { Component } from 'react'
import { Form, FormGroup, FormControl, Col, ControlLabel, Button, Panel } from 'react-bootstrap'

import { bindActionCreators } from 'redux'
import { reduxForm } from 'redux-form'

import { startPractice, fetchCurrentUserPracticeLists, fetchPracticeTypes } from '../modules/practices'

class StartPracticeForm extends Component {
  constructor (props) {
    super(props)

    this.state = {
      selectedPracticeType: null,
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
      selectedPracticeList: nextProps.currentUserPracticeLists[0]._id
    })
  }

  selectPracticeType (event) {
    console.log(event.target.value)
    const selectedPracticeType = event.target.value

    this.setState({
      selectedPracticeType
    })
  }

  selectPracticeList (event) {
    console.log(event.target.value)
    const selectedPracticeList = event.target.value

    this.setState({
      selectedPracticeList
    })
  }

  handleFormSubmit ({required_consistency_repetitions}) {
    this.props.startPractice({
      selectedPracticeType: this.state.selectedPracticeType,
      selectedPracticeList: this.state.selectedPracticeList,
      required_consistency_repetitions
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
    const {fields: { required_consistency_repetitions }, handleSubmit} = this.props

    return (
      <Panel>
        <Form horizontal onSubmit={handleSubmit(this.handleFormSubmit)}>

          <FormGroup controlId='formControlsSelect'>
            <ControlLabel>Select Practice Type</ControlLabel>
            <FormControl componentClass='select' placeholder='select' onChange={this.selectPracticeType}>
              { this.props.practiceTypes.map(practiceType => {
                return <option key={practiceType.name} value={practiceType._id}>{practiceType.name}</option>
              })}
            </FormControl>
          </FormGroup>

          <FormGroup controlId='formControlsSelect'>
            <ControlLabel>Select Practice List</ControlLabel>
            <FormControl componentClass='select' placeholder='select' onChange={this.selectPracticeList}>
              { this.props.currentUserPracticeLists.map(practiceList => {
                return <option key={practiceList._id} value={practiceList._id}>{practiceList.title}</option>
              })}
            </FormControl>
          </FormGroup>

          <FormGroup controlId='formHorizontalEmail'>
            <FormControl type='text' placeholder='Repetitions per Flourish' {...required_consistency_repetitions} />
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
  fields: ['required_consistency_repetitions'],
  validate
}, mapStateToProps, mapDispatchToProps)(StartPracticeForm)
