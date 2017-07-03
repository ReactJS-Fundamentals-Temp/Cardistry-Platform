import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import { fetchFlourishes } from '../modules/flourishes.js'

import FlourishList from '../components/FlourishList'

class FlourishesPage extends Component {
  componentWillMount () {
    this.props.fetchFlourishes()
    console.log(this.props.flourishes, 'flourishes')
  }

  render () {
    return (
      <div>
        <FlourishList flourishes={this.props.flourishes.all} />
      </div>
    )
  }
}

function mapStateToProps (state) {
  return { flourishes: state.flourishes }
}

function mapDispatchToProps (dispatch) {
  return bindActionCreators({ fetchFlourishes }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(FlourishesPage)
