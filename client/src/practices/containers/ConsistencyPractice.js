
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { Panel } from 'react-bootstrap'

import { fetchPractice } from '../modules/practices'

import PracticeInformationBar from '../components/PracticeInformationBar'
import ConsistencyTracker from './ConsistencyTracker'
import ConsistencyControls from './ConsistencyControls'

class ConsistencyPractice extends Component {
  constructor (props) {
    super(props)

    this.state = {
      streak: 0
    }
  }

  componentDidMount () {
    const practiceId = this.props.params.id
    this.props.fetchPractice(practiceId)
  }

  render () {
    const practice = this.props.practice

    return (
      <Panel>
        <PracticeInformationBar practiceList={practice._practice_list} nextFlourish={practice._practice_list.flourishes[practice._practice_list.flourishes.length === 1 ? 0 : practice.step + 1]} />
        <ConsistencyTracker currentFlourish={practice._practice_list.flourishes[practice.step].title} streak={this.state.streak} requiredConsistencyRepetitions={practice.required_consistency_repetitions} />
        <ConsistencyControls totalFails={practice.total_fails} totalSuccesses={practice.total_successes} />
      </Panel>
    )
  };
}

function mapStateToProps (state) {
  return { practice: state.practices.currentPractice }
}

function mapDispatchToProps (dispatch) {
  return bindActionCreators({ fetchPractice }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(ConsistencyPractice)
