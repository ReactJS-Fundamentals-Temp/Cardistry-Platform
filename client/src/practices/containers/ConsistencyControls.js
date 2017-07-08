
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { Panel, Button } from 'react-bootstrap'

class ConsistencyControls extends Component {
  render () {
    return (
      <Panel>
        <h1>ConsistencyControls</h1>
        <p>{this.props.totalFails}</p>
        <p>{this.props.totalSuccesses}</p>
        <Button>Fail</Button>
        <Button>Success</Button>
      </Panel>
    )
  };
}

function mapDispatchToProps (dispatch) {
  return bindActionCreators({ }, dispatch)
}

export default connect(null, mapDispatchToProps)(ConsistencyControls)
