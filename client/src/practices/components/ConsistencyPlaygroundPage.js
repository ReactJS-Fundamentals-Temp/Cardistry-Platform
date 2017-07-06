import React, { Component } from 'react'

import ConsistencyInformationBar from '../containers/ConsistencyInformationBar'
import ConsistencyTracker from '../containers/ConsistencyTracker'
import ConsistencyControls from '../containers/ConsistencyControls'

export default class ConsistencyPlaygroundPage extends Component {
  render () {
    return (
      <div>
        <ConsistencyInformationBar />
        <ConsistencyTracker />
        <ConsistencyControls />
      </div>
    )
  }
}
