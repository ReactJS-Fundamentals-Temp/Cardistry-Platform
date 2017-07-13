import React, { Component, PropTypes } from 'react'
import Dropzone from 'react-dropzone'
import { Form, FormGroup, FormControl, Col, ControlLabel, Button, Panel } from 'react-bootstrap'

import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { reduxForm } from 'redux-form'

import { createFlourish } from '../modules/flourishes';


class CreateFlourishForm extends Component {
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
        <Panel>
            <Form horizontal onSubmit={handleSubmit(this.handleFormSubmit)}>
                <FormGroup controlId="formHorizontalEmail">
                <Col sm={12}>
                    <FormControl type="text" placeholder="Title" {...title} />
                    {title.touched && title.error && <div className='error'>{title.error}</div>}
                </Col>
                </FormGroup>

                <FormGroup controlId="formHorizontalPassword">
                <Col sm={12}>
                    <FormControl type="text" placeholder="Description" {...description} />
                    {description.touched && description.error && <div className='error'>{description.error}</div>}
                </Col>
                </FormGroup>

        {/*
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
                </FormGroup>*/}

                <FormGroup>
                <Col sm={12}>
                    <Button type="submit">
                        Upload Flourish
                    </Button>
                </Col>
                </FormGroup>
            </Form>
        </Panel>
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

    //TODO VALIDATION

    return errors;
}

function mapStateToProps(state) {
    return {
        errorMessage: state.errors.error
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({ createFlourish }, dispatch);
}

export default reduxForm({
    form: 'CreateFlourishForm',
    fields: ['title', 'description', 'video', 'thumbnail', 'images'],
    validate
}, mapStateToProps, mapDispatchToProps)(CreateFlourishForm)
