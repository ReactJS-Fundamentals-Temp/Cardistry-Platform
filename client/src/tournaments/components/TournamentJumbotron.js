import React, { Component } from 'react'
import { Jumbotron, Image, Button } from 'react-bootstrap'

export default class TournamentJumbotron extends Component {
  joinTournament (event) {
    let tournamentId = event.target.getAttribute("data-id")
    
    

  }

  render () {
    const tournament = this.props.tournament
    console.log(tournament)

    return (
      <div>
        <Jumbotron>
          <h1>{tournament.title}</h1>
          <p>{tournament.description}</p>
          <Button data-id={tournament._id} onClick={this.joinTournament.bind(this)}>Join Tournament</Button>
        </Jumbotron>
      </div>
    )
  }
}
