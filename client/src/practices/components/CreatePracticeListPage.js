import React, { Component } from 'react'

import CreatePracticeListForm from '../containers/CreatePracticeListForm'
import SearchFlourishBar from '../containers/SearchFlourishBar'

export default class CreateEventPage extends Component {
  render () {
    return (
      <div>
        <SearchFlourishBar />
        <CreatePracticeListForm />
      </div>
    )
  }
}
