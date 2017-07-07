import React, { Component, PropTypes } from 'react'
import Dropzone from 'react-dropzone'
import { Form, FormGroup, FormControl, Col, ControlLabel, Button } from 'react-bootstrap'

import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { reduxForm } from 'redux-form'

import { createTournament } from '../modules/tournaments';


class CreateTournamentForm extends Component {
    constructor(props) {
        super(props);

        this.handleFormSubmit = this.handleFormSubmit.bind(this);
        this.onDrop = this.onDrop.bind(this);
    }

    static contextTypes = {
        router: PropTypes.object
    }

     onDrop(acceptedFiles, rejectedFiles) {
    }

    handleFormSubmit({title, description, participantCount, roundsCount, prize}) {
        this.props.createTournament({ title, description, participantCount, roundsCount, prize});
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
        const {fields: {title, description, participantCount, roundsCount, prize}, handleSubmit} = this.props;

        return (
        <Form horizontal onSubmit={handleSubmit(this.handleFormSubmit)}>
            <FormGroup controlId="formHorizontalEmail">
            <Col componentClass={ControlLabel} sm={2}>
                Title
            </Col>
            <Col sm={10}>
                <FormControl type="text" placeholder="Title" {...title} />
            </Col>
            </FormGroup>

            <FormGroup controlId="formHorizontalPassword">
            <Col componentClass={ControlLabel} sm={2}>
                Description
            </Col>
            <Col sm={10}>
                <FormControl type="text" placeholder="Description" {...description} />
            </Col>
            </FormGroup>

            <FormGroup controlId="formHorizontalPassword">
            <Col componentClass={ControlLabel} sm={2}>
                Participant count
            </Col>
            <Col sm={10}>
                <FormControl type="number" placeholder="Enter a number" {...participantCount} />
            </Col>
            </FormGroup>

            <FormGroup controlId="formHorizontalPassword">
            <Col componentClass={ControlLabel} sm={2}>
                Rounds count
            </Col>
            <Col sm={10}>
                <FormControl type="number" placeholder="Enter a number" {...roundsCount} />
            </Col>
            </FormGroup>

            <FormGroup controlId="formHorizontalPassword">
            <Col componentClass={ControlLabel} sm={2}>
                Prize
            </Col>
            <Col sm={10}>
                <FormControl type="text" placeholder="What is the prize?" {...prize} />
            </Col>
            </FormGroup>

            <FormGroup>
            <Col smOffset={2} sm={10}>
                <Button type="submit">
                    Create Tournament
                </Button>
            </Col>
            </FormGroup>
        </Form>
        )
    }
}


function validate(values) {
    const errors = {};

    if (!values.title) {
        errors.title = 'Title is required';
    }

    if (!values.description) {
        errors.description = 'Description is required';
    }

    //TODO VALIDATIONS

    return errors;
}

function mapStateToProps(state) {
    return {
        errorMessage: state.tournaments.error
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({ createTournament }, dispatch);
}

export default reduxForm({
    form: 'CreateTournamentForm',
    fields: ['title', 'description', 'participantCount', 'roundsCount', 'prize'],
    validate
}, mapStateToProps, mapDispatchToProps)(CreateTournamentForm)
