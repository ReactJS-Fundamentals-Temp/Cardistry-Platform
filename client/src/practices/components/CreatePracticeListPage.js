import React, { Component } from 'react'
import { Panel } from 'react-bootstrap'

import CreatePracticeListForm from '../containers/CreatePracticeListForm'
import SearchFlourishBar from '../containers/SearchFlourishBar'

export default class CreatePracticeListPage extends Component {
  render () {
    return (
      <div>
        <h1>Create Practice List</h1>
        <Panel>
          <SearchFlourishBar />
          <CreatePracticeListForm />
        </Panel>
      </div>
    )
  }
}
