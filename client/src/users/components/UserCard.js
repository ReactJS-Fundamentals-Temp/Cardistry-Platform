import React, { Component } from 'react'
import { Panel } from 'react-bootstrap'

export default class UserCard extends Component {
  render () {
    return (
      <div>
        <Panel>
          <h1>{this.props.user.username}</h1>
        </Panel>
      </div>
    )
  }
}
