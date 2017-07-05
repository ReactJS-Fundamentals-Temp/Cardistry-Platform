import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import { fetchEvents } from '../modules/events'

import EventsList from '../components/EventsList'

class EventsPage extends Component {
  componentDidMount () {
    this.props.fetchEvents()
  }

  render () {
    return (
      <div>
        <h1>Events</h1>
        <EventsList events={this.props.events}/>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return { events: state.events.all }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ fetchEvents }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(EventsPage)
