import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import { fetchUserFlourishes } from '../modules/flourishes'

import FlourishList from '../components/FlourishList'

class PortfolioPage extends Component {
  componentDidMount () {
    const username = this.props.params.username
    this.props.fetchUserFlourishes(username)
  }

  render () {
    return (
      <div>
        <h1>Portfolio</h1>
        <FlourishList flourishes={this.props.flourishes} />
      </div>
    )
  }
}

function mapStateToProps (state) {
  return { flourishes: state.flourishes.userFlourishes }
}

function mapDispatchToProps (dispatch) {
  return bindActionCreators({ fetchUserFlourishes }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(PortfolioPage)
