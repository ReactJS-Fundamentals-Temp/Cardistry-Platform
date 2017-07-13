import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { Panel } from 'react-bootstrap'

import { fetchPractice } from '../modules/practices'

class PracticeSummary extends Component {
  constructor (props) {
    super(props)

    this.state = {
      practiceId: this.props.params.id
    }
  }

  componentDidMount () {
    this.props.fetchPractice(this.state.practiceId)
  }

  render () {
    const practice = this.props.practice
    console.log(practice)

    return (
      <Panel>
        <h1>PRACTICE SUMMARY</h1>
        <p>Total successes: {practice.total_successes}</p>
        <p>Total fails: {practice.total_fails}</p>
        <p>Required Flourish repetitions: {practice.required_consistency_repetitions}</p>
      </Panel>
    )
  };
}

function mapStateToProps (state) {
  return {
    practice: state.practices.currentPractice
  }
}

function mapDispatchToProps (dispatch) {
  return bindActionCreators({ fetchPractice }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(PracticeSummary)
