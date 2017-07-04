import React, { Component, PropTypes } from 'react'
import Dropzone from 'react-dropzone'
import { Form, FormGroup, FormControl, Col, ControlLabel, Button } from 'react-bootstrap'

import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { reduxForm } from 'redux-form'

import { createFlourish } from '../modules/flourishes';


class AddFlourishForm extends Component {
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

    handleFormSubmit({title, description, video, thumbnail, images}) {
        this.props.createFlourish({ title, description, video, thumbnail, images });
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
        const {fields: {title, description, video, thumbnail, images}, handleSubmit} = this.props;

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
                Video
            </Col>
            <Col sm={10}>
                <FormControl type="file" onDrop={this.onDrop()} placeholder="Video" {...video} value={undefined} />
            </Col>
            </FormGroup>

            <FormGroup controlId="formHorizontalPassword">
            <Col componentClass={ControlLabel} sm={2}>
                Thumbnail
            </Col>
            <Col sm={10}>
                <FormControl type="file" placeholder="Thumbnail" {...thumbnail} />
            </Col>
            </FormGroup>

            <FormGroup controlId="formHorizontalPassword">
            <Col componentClass={ControlLabel} sm={2}>
                Images
            </Col>
            <Col sm={10}>
                <FormControl type="file" placeholder="Images" {...images} />
            </Col>
            </FormGroup>

            <FormGroup>
            <Col smOffset={2} sm={10}>
                <Button type="submit">
                    Upload Flourish
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
        errors.title = 'Email is required';
    }

    if (!values.description) {
        errors.password = 'Password is required';
    }

    //TODO VALIDATION

    return errors;
}

function mapStateToProps(state) {
    return {
        errorMessage: state.flourishes.error
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({ createFlourish }, dispatch);
}

export default reduxForm({
    form: 'CreateFlourishForm',
    fields: ['title', 'description', 'video', 'thumbnail', 'images'],
    validate
}, mapStateToProps, mapDispatchToProps)(AddFlourishForm)
