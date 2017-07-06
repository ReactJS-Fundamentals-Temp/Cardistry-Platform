
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { Panel } from 'react-bootstrap'

import { searchFlourishes } from '../../flourishes/modules/flourishes'

class ConsistencyTracker extends Component {
  render () {
    return (
      <Panel>
        <h1>ConsistencyTracker</h1>
      </Panel>
    )
  };
}

function mapDispatchToProps (dispatch) {
  return bindActionCreators({ searchFlourishes }, dispatch)
}

export default connect(null, mapDispatchToProps)(ConsistencyTracker)
