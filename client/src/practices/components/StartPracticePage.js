import React, { Component } from 'react'
import { Link } from 'react-router'
import { Jumbotron, Button } from 'react-bootstrap'

import StartPracticeForm from '../containers/StartPracticeForm'

export default class StartPracticePage extends Component {
  render () {
    return (
      <div>
        <h1>Start New Practice</h1>
        <StartPracticeForm />
      </div>
    )
  }
}
