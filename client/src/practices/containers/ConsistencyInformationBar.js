
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { Panel } from 'react-bootstrap'

import { fetchPractice } from '../modules/practices'

class ConsistencyInformationBar extends Component {
  componentDidMount () {
    console.log('MOUNT')
    const practiceId = this.props.practiceId
    console.log(practiceId, 'ID')

    this.props.fetchPractice(practiceId)
  }

  render () {
    const practice = this.props.practice
    const practiceList = practice._practice_list

    return (
      <Panel>
        <h1>ConsistencyInformationBar</h1>
        <p>{practice._practice_list.title}</p>
        <p>{practiceList.flourishes[practiceList.flourishes.length === 1 ? 0 : practice.step + 1].title}</p>
      </Panel>
    )
  };
}

function mapStateToProps (state) {
  return { practice: state.practices.currentPractice }
}

function mapDispatchToProps (dispatch) {
  return bindActionCreators({ fetchPractice }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(ConsistencyInformationBar)
