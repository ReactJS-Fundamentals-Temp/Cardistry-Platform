import React, { Component, PropTypes } from 'react'
import { Form, FormGroup, FormControl, Col, ControlLabel, Button, Checkbox, Panel } from 'react-bootstrap'

import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { reduxForm } from 'redux-form'

import { fetchFlourishes } from '../../flourishes/modules/flourishes';
import { createPracticeList } from '../modules/practice';

import FlourishJumbotron from '../../flourishes/components/FlourishJumbotron'


class CreatePracticeListForm extends Component {
    constructor(props) {
        super(props)

        this.handleFormSubmit = this.handleFormSubmit.bind(this)
        this.toggleCheckbox = this.toggleCheckbox.bind(this)
    }

    static contextTypes = {
        router: PropTypes.object
    }

    componentDidMount() {
        this.props.fetchFlourishes()
    }

    toggleCheckbox (e) {
        console.log(e.target.checked, 'EVENT')
    }

    handleFormSubmit({flourishes}) {
        // this.props.createPracticeList()
    }

    renderFlourishes() {
        return this.props.flourishes.map(flourish => {
            return (
                <div>
                    <Checkbox key={flourish._id} onChange={this.toggleCheckbox}>
                    {flourish.title}
                    </Checkbox>
                    {/*<input type="checkbox" onChange={this.toggleCheckbox} />*/}
                </div>
            )
        })
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
        const {fields: {}, handleSubmit} = this.props
        console.log(this.props.flourishes, 'PROPS FLOURISHES')

        return (
            <Form horizontal onSubmit={handleSubmit(this.handleFormSubmit)}>
             <Panel>
                <FormGroup>
                    {this.renderFlourishes()}
                </FormGroup>
            </Panel>

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
        flourishes: state.flourishes.all,
        errorMessage: state.events.error
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({ fetchFlourishes, createPracticeList }, dispatch);
}

export default reduxForm({
    form: 'CreatePracticeListForm',
    fields: [],
    validate
}, mapStateToProps, mapDispatchToProps)(CreatePracticeListForm)
