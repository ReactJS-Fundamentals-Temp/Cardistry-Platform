import React, { Component } from 'react'
import { ListGroup, ListGroupItem } from 'react-bootstrap'

import Event from './Event'

export default class EventsList extends Component {
  linkClicked () {
    console.log('clicked')
  }

  renderEvents () {
    return this.props.events.map(event => {
        return (
            <ListGroupItem onClick={this.linkClicked} key={event._id}>
                <Event event={event} />
            </ListGroupItem>
        )
    })
  }

  render () {
    return (
      <div>
        <ListGroup>
          {this.renderEvents()}
        </ListGroup>
      </div>
    )
  }
}
