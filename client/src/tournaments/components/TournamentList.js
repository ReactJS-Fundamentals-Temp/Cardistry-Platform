import React, { Component } from 'react'
import { ListGroup, ListGroupItem } from 'react-bootstrap'

import TournamentJumbotron from './TournamentJumbotron'

export default class TournamentsList extends Component {
  linkClicked () {
    console.log('clicked')
  }

  renderTournaments () {
    return this.props.tournaments.map(tournament => {
      return (
        <ListGroupItem onClick={this.linkClicked} key={tournament._id}>
          <TournamentJumbotron tournament={tournament} />
        </ListGroupItem>
      )
    })
  }

  render () {
    return (
      <div>
        <ListGroup>
          {this.renderTournaments()}
        </ListGroup>
      </div>
    )
  }
}
