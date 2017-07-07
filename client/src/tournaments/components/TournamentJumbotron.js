import React, { Component } from 'react'
import { Jumbotron, Image } from 'react-bootstrap'

export default class TournamentJumbotron extends Component {
  render () {
    const tournament = this.props.tournament
    console.log(tournament)

    return (
      <div>
        <Jumbotron>
          <h1>{tournament.title}</h1>
          <p>{tournament.description}</p>
        </Jumbotron>
      </div>
    )
  }
}
