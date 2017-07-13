import React, { Component } from 'react'
import CreateTournamentForm from '../containers/CreateTournamentForm'

export default class CreateTournamentPage extends Component {
  render () {
    return (
      <div>
        <h1>Host Tournament</h1>
        <CreateTournamentForm />
      </div>
    )
  }
}
