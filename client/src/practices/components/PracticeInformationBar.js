
import React, { Component } from 'react'
import { Panel } from 'react-bootstrap'

export default class PracticeInformationBar extends Component {
  render () {
    return (
      <Panel>
        <h1>ConsistencyInformationBar</h1>
        <p>{this.props.practiceList.title}</p>
        <p>{this.props.nextFlourish.title}</p>
        <p>{this.props.streak}</p>
        <p>{this.props.requiredConsistencyStreak}</p>
      </Panel>
    )
  };
}
