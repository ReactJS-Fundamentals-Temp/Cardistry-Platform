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

    handleFormSubmit({title, description}) {
        this.props.createTournament({ title, description});
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
        const {fields: {title, description}, handleSubmit} = this.props;

        return (
        <Form horizontal onSubmit={handleSubmit(this.handleFormSubmit)}>
            <FormGroup controlId="formHorizontalEmail">
            <Col componentClass={ControlLabel} sm={2}>
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
    fields: ['title', 'description', 'video', 'thumbnail', 'images'],
    validate
}, mapStateToProps, mapDispatchToProps)(CreateTournamentForm)
