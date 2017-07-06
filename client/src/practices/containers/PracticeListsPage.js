import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import { } from '../modules/practice'

class PracticeListsPage extends Component {
  componentDidMount () {
  }

  render () {
    return (
      <div>
        <h1>Practice Lists</h1>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return { }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(PracticeListsPage)
