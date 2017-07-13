import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { Panel } from 'react-bootstrap'

import { fetchPractice, completeStep, completePractice } from '../modules/practices'
import { resetStreak, resetScore } from '../modules/consistency'

import PracticeInformationBar from '../components/PracticeInformationBar'
import ConsistencyTracker from './ConsistencyTracker'
import ConsistencyControls from './ConsistencyControls'

class ConsistencyPractice extends Component {
  constructor (props) {
    super(props)

    this.state = {
      practiceId: this.props.params.id
    }
  }

  componentDidMount () {
    this.props.fetchPractice(this.state.practiceId)
  }

  componentWillReceiveProps (nextProps) {
    console.log(nextProps, 'NEXT')

    if (nextProps.streak === this.props.practice.required_consistency_repetitions) {
      if (nextProps.practice.step !== this.props.practice._practice_list.flourishes.length - 1) {
        console.log(this.props.totalSuccesses, 'TOTAL SUCCESSES')
        this.props.completeStep(this.state.practiceId, {successes: nextProps.totalSuccesses, fails: nextProps.totalFails})
      } else {
        // Complete Practice
        console.log('COMPLETE')
        this.props.completePractice(this.state.practiceId, {successes: nextProps.totalSuccesses, fails: nextProps.totalFails})
      }

      this.props.resetScore()
    }
  }

  render () {
    const practice = this.props.practice

    return (
      <Panel>
        <PracticeInformationBar practiceList={practice._practice_list} nextFlourish={this.props.nextFlourish} />
        <ConsistencyTracker currentFlourish={this.props.currentFlourish} streak={this.props.streak} requiredConsistencyRepetitions={practice.required_consistency_repetitions} />
        <ConsistencyControls totalFails={this.props.totalFails} totalSuccesses={this.props.totalSuccesses} />
      </Panel>
    )
  };
}

function mapStateToProps (state) {
  return {
    practice: state.practices.currentPractice,
    streak: state.consistency.streak,
    currentFlourish: state.practices.currentFlourish,
    nextFlourish: state.practices.nextFlourish,
    totalSuccesses: state.consistency.totalSuccesses,
    totalFails: state.consistency.totalFails
  }
}

function mapDispatchToProps (dispatch) {
  return bindActionCreators({ fetchPractice, completeStep, completePractice, resetStreak, resetScore }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(ConsistencyPractice)
