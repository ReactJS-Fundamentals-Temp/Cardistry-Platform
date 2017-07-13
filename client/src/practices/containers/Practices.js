import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import { fetchUserPractices } from '../modules/practices'

import Practice from '../components/Practice'

class Practices extends Component {
  componentDidMount () {
    this.props.fetchUserPractices()
  }

  renderPractices () {
    return this.props.practices.map(practice => {
      return (
        <div>
          <Practice key={practice._id} practice={practice} />
          <hr />
        </div>
      )
    })
  }

  render () {
    return (
      <div>
        <h1>Practices History</h1>
        {this.renderPractices()}
      </div>
    )
  }
}

function mapStateToProps (state) {
  return {practices: state.practices.currentUserPractices}
}

function mapDispatchToProps (dispatch) {
  return bindActionCreators({ fetchUserPractices }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Practices)
