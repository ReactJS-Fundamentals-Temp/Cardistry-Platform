import React, { Component } from 'react'
import { Jumbotron, Button } from 'react-bootstrap'

import FlourishList from '../../flourishes/components/FlourishList'

export default class PracticeList extends Component {
  render () {
    const practiceList = this.props.practiceList

    return (
      <div>
        <Jumbotron>
          <h1>{practiceList.title}</h1>
          <FlourishList flourishes={practiceList.flourishes} />
          <h2>Times Practiced: {practiceList.times_practiced}</h2>
          <Button>PRACTICE NOW</Button>
        </Jumbotron>
      </div>
    )
  }
}
