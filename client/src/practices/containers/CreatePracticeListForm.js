import React, { Component, PropTypes } from 'react'
import { Form, FormGroup, FormControl, Col, ControlLabel, Button, Checkbox, Panel } from 'react-bootstrap'

import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { reduxForm } from 'redux-form'

import { fetchFlourishes } from '../../flourishes/modules/flourishes'
import { createPracticeList } from '../modules/practices'

import FlourishJumbotron from '../../flourishes/components/FlourishJumbotron'


class CreatePracticeListForm extends Component {
    constructor(props) {
        super(props)

        this.handleFormSubmit = this.handleFormSubmit.bind(this)
        this.toggleCheckbox = this.toggleCheckbox.bind(this)

        this.state = {
            selectedFlourishes: []
        }
    }

    static contextTypes = {
        router: PropTypes.object
    }

    toggleCheckbox (event) {
        let checkedFlourishId = event.target.getAttribute("data-id")
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

    handleFormSubmit({title}) {
        console.log(title, 'title before redux')
        console.log(this.state.selectedFlourishes, 'flourishes before redux')

        this.props.createPracticeList({flourishes: this.state.selectedFlourishes, title})
    }

    renderFlourishes() {
        if (this.props.flourishes < 1) {
            return ( <p>No flourishes selected.</p>)
        }

        return this.props.flourishes.map(flourish => {
            return (
                <Checkbox className='flourish-checkbox' key={flourish._id} onChange={this.toggleCheckbox} data-id={flourish._id}>
                {flourish.title}
                </Checkbox>
            )
        })
    }

    renderAlert() {
        if (this.props.errorMessage) {
            return (
                <div className='alert alert-danger'>
                    <strong>{this.props.errorMessage}</strong>
                </div>
            )
        }
    }


    render() {
        const {fields: {title}, handleSubmit} = this.props

        return (
            <Form horizontal onSubmit={handleSubmit(this.handleFormSubmit)}>
             <Panel>
                <FormGroup>
                    {this.renderFlourishes()}
                </FormGroup>
            </Panel>

            <FormGroup controlId="formHorizontalTitle">
            <Col componentClass={ControlLabel} sm={2}>
                Title
            </Col>
            <Col sm={10}>
                <FormControl type="text" placeholder="Title" {...title} />
            </Col>
            </FormGroup>

            <FormGroup>
            <Col sm={10}>
                <Button type="submit">
                    Create PracticeList
                </Button>
            </Col>
            </FormGroup>
            </Form>
        )
    }
}


function validate(values) {
    const errors = {}

    //TODO VALIDATION
    return errors
}

function mapStateToProps(state) {
    return {
        flourishes: state.flourishes.searchResults,
        errorMessage: state.events.error
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({ createPracticeList }, dispatch)
}

export default reduxForm({
    form: 'CreatePracticeListForm',
    fields: ['title'],
    validate
}, mapStateToProps, mapDispatchToProps)(CreatePracticeListForm)
