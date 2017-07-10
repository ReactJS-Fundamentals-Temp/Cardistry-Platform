import React, { Component } from 'react'
import { Jumbotron, Image, Button } from 'react-bootstrap'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import { joinTournament } from '../modules/tournaments'

class TournamentJumbotron extends Component {
  joinTournament (event) {    
    this.props.joinTournament(this.props.tournament._id)
  }

  renderJoinButton () {
    if (this.props.authenticated) {
      return (
          <Button onClick={this.joinTournament.bind(this)}>Join Tournament</Button>
      )
    }
  }

  render () {
    const tournament = this.props.tournament
    console.log(tournament)

    return (
      <div>
        <Jumbotron>
          <h1>{tournament.title}</h1>
          <p>{tournament.description}</p>
          { this.renderJoinButton() }
        </Jumbotron>
      </div>
    )
  }
}

function mapStateToProps (state) {
  return { authenticated: state.authentication.authenticated }
}

function mapDispatchToProps (dispatch) {
  return bindActionCreators({ joinTournament }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(TournamentJumbotron)
