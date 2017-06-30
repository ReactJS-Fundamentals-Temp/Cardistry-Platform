import React, { Component } from 'react'
import { Link } from 'react-router'
import { Jumbotron, Button } from 'react-bootstrap'

export default class NotFoundPage extends Component {
  render () {
    return (
      <div>
        <Jumbotron>
          <h1>Consistency</h1>
          <p>Practice your consistency</p>
          <Link to='/practice/consistency'>Practice Consistency</Link>
        </Jumbotron>
        <Jumbotron>
          <h1>Speed</h1>
          <p>Practice your speed</p>
          <Link to='/practice/speed'>Practice Speed</Link>
        </Jumbotron>
        <Jumbotron>
          <h1>Flow</h1>
          <p>Practice your flow</p>
          <Link to='/practice/flow'>Practice Flow</Link>
        </Jumbotron>
      </div>
    )
  }
}
