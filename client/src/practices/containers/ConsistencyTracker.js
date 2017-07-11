import React, { Component } from 'react'
import { Panel } from 'react-bootstrap'

export default class ConsistencyTracker extends Component {
  render () {
    return (
      <Panel>
        <h1>ConsistencyTracker</h1>
        <p>{this.props.currentFlourish.title}</p>
        <p>{this.props.streak}</p>
        <p>{this.props.requiredConsistencyRepetitions}</p>
      </Panel>
    )
  }
}
