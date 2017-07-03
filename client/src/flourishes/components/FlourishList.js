import React, { Component } from 'react'
import { ListGroup, ListGroupItem } from 'react-bootstrap'

import Flourish from './Flourish'

export default class FlourishesList extends Component {
  linkClicked () {
    console.log('clicked')
  }

  renderFlourishes () {
    return this.props.flourishes.map(flourish => {
      return (
        <ListGroupItem onClick={this.linkClicked} key={flourish._id}>
          <Flourish flourish={flourish} />
        </ListGroupItem>
      )
    })
  }

  render () {
    return (
      <div>
        <ListGroup>
          {this.renderFlourishes()}
        </ListGroup>
      </div>
    )
  }
}
