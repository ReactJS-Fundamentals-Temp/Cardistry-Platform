import React, { Component } from 'react'
import { Jumbotron, Image } from 'react-bootstrap'

export default class Event extends Component {
  render () {
    const event = this.props.event
    console.log(event)

    return (
      <div>
        <Jumbotron>
          <h1>{event.title}</h1>
          <p>{event.description}</p>
          <p>{event.location}</p>
        </Jumbotron>
      </div>
    )
  }
}
