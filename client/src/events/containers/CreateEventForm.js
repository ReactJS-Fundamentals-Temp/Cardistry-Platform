import React, { Component, PropTypes } from 'react'
import Dropzone from 'react-dropzone'
import { Form, FormGroup, FormControl, Col, ControlLabel, Button, Panel } from 'react-bootstrap'

import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { reduxForm } from 'redux-form'

import { createEvent } from '../modules/events';


class CreateEventForm extends Component {
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

    handleFormSubmit({title, description, location}) {
        this.props.createEvent({title, description, location})
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
        const {fields: {title, description, location}, handleSubmit} = this.props;

        return (
            <Panel>
                <Form horizontal onSubmit={handleSubmit(this.handleFormSubmit)}>
                    <FormGroup controlId="formHorizontalTitle">
                        <Col sm={12}>
                            <FormControl type="text" placeholder="Title" {...title} />
                            {title.touched && title.error && <div className='error'>{title.error}</div>}

                        </Col>
                    </FormGroup>

                    <FormGroup controlId="formHorizontalDescription">
                        <Col sm={12}>
                            <FormControl type="text" placeholder="Description" {...description} />
                            {description.touched && description.error && <div className='error'>{description.error}</div>}

                        </Col>
                    </FormGroup>

                    <FormGroup controlId="formHorizontalLocation">
                        <Col sm={12}>
                            <FormControl type="text" placeholder="Location" {...location} />
                            {location.touched && location.error && <div className='error'>{location.error}</div>}

                        </Col>
                    </FormGroup>

                    <FormGroup>
                    <Col sm={12}>
                        <Button type="submit">
                            Create Event
                        </Button>
                    </Col>
                    </FormGroup>
                </Form>
            </Panel>
        )
    }
}


function validate(values) {
    const errors = {}

    if (!values.title) {
        errors.title = 'Title is required';
    }

    if (!values.description) {
        errors.description = 'Description is required';
    }

    if (!values.location) {
        errors.location = 'Location is required';
    }

    //TODO VALIDATION
    return errors
}

function mapStateToProps(state) {
    return {
        errorMessage: state.errors.error
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({ createEvent }, dispatch);
}

export default reduxForm({
    form: 'CreateEventForm',
    fields: ['title', 'description', 'location'],
    validate
}, mapStateToProps, mapDispatchToProps)(CreateEventForm)
