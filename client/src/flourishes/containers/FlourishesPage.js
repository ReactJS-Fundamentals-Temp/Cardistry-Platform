import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import { fetchFlourishes } from '../modules/flourishes.js'

import FlourishList from '../components/FlourishList'

class FlourishesPage extends Component {
  componentDidMount () {
    this.props.fetchFlourishes()
    console.log(this.props.flourishes, 'flourishes')
  }

  render () {
    return (
      <div>
        <FlourishList flourishes={this.props.flourishes} />
      </div>
    )
  }
}

function mapStateToProps (state) {
  return { flourishes: state.flourishes.all }
}

function mapDispatchToProps (dispatch) {
  return bindActionCreators({ fetchFlourishes }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(FlourishesPage)
