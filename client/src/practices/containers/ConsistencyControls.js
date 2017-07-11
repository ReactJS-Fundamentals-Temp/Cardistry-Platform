
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { Panel, Button } from 'react-bootstrap'

import { incrementStreak, resetStreak } from '../modules/consistency'

class ConsistencyControls extends Component {
  constructor (props) {
    super(props)

    this.handleSuccess = this.handleSuccess.bind(this)
    this.handleFail = this.handleFail.bind(this)
  }

  handleSuccess () {
    this.props.incrementStreak()
  }

  handleFail () {
    this.props.resetStreak()
  }

  render () {
    return (
      <Panel>
        <h1>ConsistencyControls</h1>
        <Button onClick={this.handleFail}>Fail</Button>
        <Button onClick={this.handleSuccess}>Success</Button>
      </Panel>
    )
  };
}

function mapDispatchToProps (dispatch) {
  return bindActionCreators({ incrementStreak, resetStreak }, dispatch)
}

export default connect(null, mapDispatchToProps)(ConsistencyControls)
