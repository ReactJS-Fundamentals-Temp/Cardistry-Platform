import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { Panel } from 'react-bootstrap'

import { fetchPractice, completeStep } from '../modules/practices'
import { resetStreak } from '../modules/consistency'

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

  componentWillMount () {
    this.props.fetchPractice(this.state.practiceId)
  }

  componentWillReceiveProps (nextProps) {
    console.log(nextProps, 'NEXT')

    if (nextProps.streak === this.props.practice.required_consistency_repetitions) {
      if (nextProps.practice.step !== this.props.practice._practice_list.flourishes.length - 1) {
        this.props.completeStep(this.state.practiceId)
      } else {
        // Complete Practice
        console.log('COMPLETE')
      }

      this.props.resetStreak()
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
    totalSuccesses: state.practices.totalSuccesses,
    totalFails: state.practices.totalFails
  }
}

function mapDispatchToProps (dispatch) {
  return bindActionCreators({ fetchPractice, completeStep, resetStreak }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(ConsistencyPractice)
