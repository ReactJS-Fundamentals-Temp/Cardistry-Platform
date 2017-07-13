import React, { Component, PropTypes } from 'react'
import Dropzone from 'react-dropzone'
import { Form, FormGroup, FormControl, Col, ControlLabel, Button, Panel } from 'react-bootstrap'

import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { reduxForm } from 'redux-form'

import { createTournament } from '../modules/tournaments'

class CreateTournamentForm extends Component {
  constructor (props) {
    super(props)

    this.handleFormSubmit = this.handleFormSubmit.bind(this)
    this.onDrop = this.onDrop.bind(this)
  }

  onDrop (acceptedFiles, rejectedFiles) {
  }

  handleFormSubmit ({title, description, participantsLimit, contestantsLimit, roundsCount, prize}) {
    this.props.createTournament({title, description, participantsLimit, contestantsLimit, roundsCount, prize})
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
    const {fields: {title, description, participantsLimit, contestantsLimit, roundsCount, prize}, handleSubmit} = this.props

    return (
      <Panel>
        <Form horizontal onSubmit={handleSubmit(this.handleFormSubmit)}>
          <FormGroup controlId='formHorizontalTitle'>

            <Col sm={12}>
              <FormControl type='text' placeholder='Title' {...title} />
              {title.touched && title.error && <div className='error'>{title.error}</div>}
            </Col>
          </FormGroup>

          <FormGroup controlId='formHorizontalDescription'>

            <Col sm={12}>
              <FormControl type='text' placeholder='Description' {...description} />
              {description.touched && description.error && <div className='error'>{description.error}</div>}
            </Col>
          </FormGroup>

          <FormGroup controlId='formHorizontalParticipantLimit'>

            <Col sm={12}>
              <FormControl type='number' placeholder='Enter participant limit' {...participantsLimit} />
              {participantsLimit.touched && participantsLimit.error && <div className='error'>{participantsLimit.error}</div>}
            </Col>
          </FormGroup>

          <FormGroup controlId='formHorizontalContenstantLimit'>

            <Col sm={12}>
              <FormControl type='number' placeholder='Enter contestant limit' {...contestantsLimit} />
              {contestantsLimit.touched && contestantsLimit.error && <div className='error'>{contestantsLimit.error}</div>}
            </Col>
          </FormGroup>

          <FormGroup controlId='formHorizontalRoundsCount'>

            <Col sm={12}>
              <FormControl type='number' placeholder='Enter rounds count' {...roundsCount} />
              {roundsCount.touched && roundsCount.error && <div className='error'>{roundsCount.error}</div>}
            </Col>
          </FormGroup>

          <FormGroup controlId='formHorizontalPrize'>

            <Col sm={12}>
              <FormControl type='text' placeholder='What is the prize?' {...prize} />
              {prize.touched && prize.error && <div className='error'>{prize.error}</div>}
            </Col>
          </FormGroup>

          <FormGroup>
            <Col sm={12}>
              <Button type='submit'>
                  Create Tournament
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

  if (!values.participantsLimit) {
    errors.participantsLimit = 'Participants Limit is required'
  }

  if (!values.contestantsLimit) {
    errors.contestantsLimit = 'Contestants Limit is required'
  }

  if (!values.roundsCount) {
    errors.roundsCount = 'Rounds count is required'
  }

  if (!values.prize) {
    errors.prize = 'Prize is required'
  }

    // TODO VALIDATIONS

  return errors
}

function mapStateToProps (state) {
  return {
    errorMessage: state.errors.error
  }
}

function mapDispatchToProps (dispatch) {
  return bindActionCreators({ createTournament }, dispatch)
}

export default reduxForm({
  form: 'CreateTournamentForm',
  fields: ['title', 'description', 'participantsLimit', 'contestantsLimit', 'roundsCount', 'prize'],
  validate
}, mapStateToProps, mapDispatchToProps)(CreateTournamentForm)
