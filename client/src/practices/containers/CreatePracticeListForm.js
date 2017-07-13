import React, { Component, PropTypes } from 'react'
import { Form, FormGroup, FormControl, Col, ControlLabel, Button, Checkbox, Panel } from 'react-bootstrap'
import { bindActionCreators } from 'redux'
import { reduxForm } from 'redux-form'
import { createPracticeList } from '../modules/practices'
import { setError, resetError } from '../../errors'

class CreatePracticeListForm extends Component {
  constructor (props) {
    super(props)

    this.handleFormSubmit = this.handleFormSubmit.bind(this)
    this.toggleCheckbox = this.toggleCheckbox.bind(this)

    this.state = {
      selectedFlourishes: []
    }
  }

  componentWillUnmount () {
    this.props.resetError()

    this.setState({
      selectedFlourishes: []
    })
  }

  toggleCheckbox (event) {
    let checkedFlourishId = event.target.getAttribute('data-id')
    let isChecked = event.target.checked

    if (isChecked) {
      this.setState(prevState => ({
        selectedFlourishes: prevState.selectedFlourishes.concat([checkedFlourishId])
      }))
    } else {
      for (let [index, flourishId] of this.state.selectedFlourishes.entries()) {
        if (String(flourishId) === String(checkedFlourishId)) {
          this.setState(prevState => ({
            selectedFlourishes: prevState.selectedFlourishes.filter((_, i) => i !== index)
          }))
        }
      }
    }
  }

  handleFormSubmit ({title}) {
    console.log(title, 'title before redux')
    console.log(this.state.selectedFlourishes, 'flourishes before redux')

    if (this.state.selectedFlourishes.length < 2) {
      console.log('LESS')
      return this.props.setError('You must select at least 2 flourishes.')
    }

    this.props.createPracticeList({flourishes: this.state.selectedFlourishes, title})
  }

  renderFlourishes () {
    if (this.props.flourishes < 1) {
      return (<p>No flourishes selected.</p>)
    }

    return this.props.flourishes.map(flourish => {
      return (
        <Checkbox className='flourish-checkbox' key={flourish._id} onChange={this.toggleCheckbox} data-id={flourish._id}>
          {flourish.title}
        </Checkbox>
      )
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
    const {fields: {title}, handleSubmit} = this.props

    return (
      <Form horizontal onSubmit={handleSubmit(this.handleFormSubmit)}>
        <FormGroup>
          <Col sm={12}>
            <Panel>
              {this.renderFlourishes()}
            </Panel>
          </Col>
        </FormGroup>

        <FormGroup controlId='formHorizontalTitle'>
          <Col sm={12}>
            <FormControl type='text' placeholder='Title' {...title} />
            {title.touched && title.error && <div className='error'>{title.error}</div>}
          </Col>
        </FormGroup>

        <FormGroup>
          <Col sm={12}>
            {this.renderAlert()}
            <Button type='submit'>
                        Create PracticeList
                    </Button>
          </Col>
        </FormGroup>
      </Form>
    )
  }
}

function validate (values) {
  const errors = {}

  if (!values.title) {
    errors.title = 'Title is required'
  }

    // TODO VALIDATION
  return errors
}

function mapStateToProps (state) {
  return {
    flourishes: state.flourishes.searchResults,
    errorMessage: state.errors.error
  }
}

function mapDispatchToProps (dispatch) {
  return bindActionCreators({ createPracticeList, resetError, setError }, dispatch)
}

export default reduxForm({
  form: 'CreatePracticeListForm',
  fields: ['title'],
  validate
}, mapStateToProps, mapDispatchToProps)(CreatePracticeListForm)
