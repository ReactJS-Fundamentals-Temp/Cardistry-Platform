import React, { Component } from 'react'
import CreateEventForm from '../containers/CreateEventForm'

export default class CreateEventPage extends Component {
  render () {
    return (
      <div>
        <h1>Create Event</h1>
        <CreateEventForm />
      </div>
    )
  }
}
