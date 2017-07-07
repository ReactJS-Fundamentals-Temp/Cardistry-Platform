import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import { fetchTournaments } from '../modules/tournaments'

import TournamentList from '../components/TournamentList'

class TournamentsPage extends Component {
  componentDidMount () {
    this.props.fetchTournaments()
  }

  render () {
    console.log(this.props)
    return (
      <div>
        <TournamentList tournaments={this.props.tournaments} />
      </div>
    )
  }
}

function mapStateToProps (state) {
  return { tournaments: state.tournaments.all }
}

function mapDispatchToProps (dispatch) {
  return bindActionCreators({ fetchTournaments }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(TournamentsPage)
