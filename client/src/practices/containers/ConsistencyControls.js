
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { Panel } from 'react-bootstrap'

import { searchFlourishes } from '../../flourishes/modules/flourishes'

class ConsistencyControls extends Component {
  render () {
    return (
      <Panel>
        <h1>ConsistencyControls</h1>
      </Panel>
    )
  };
}

function mapDispatchToProps (dispatch) {
  return bindActionCreators({ searchFlourishes }, dispatch)
}

export default connect(null, mapDispatchToProps)(ConsistencyControls)
