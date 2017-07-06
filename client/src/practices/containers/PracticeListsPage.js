import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import { fetchCurrentUserPracticeLists } from '../modules/practices'

import PracticeList from '../components/PracticeList'

class PracticeListsPage extends Component {
  componentDidMount () {
    this.props.fetchCurrentUserPracticeLists()
  }

  renderPracticeLists () {
    return this.props.practiceLists.map(practiceList => {
      return (
        <div>
          <PracticeList practiceList={practiceList} />
          <hr />
        </div>
      )
    })
  }

  render () {
    return (
      <div>
        <h1>Practice Lists</h1>
        {this.renderPracticeLists()}
      </div>
    )
  }
}

function mapStateToProps (state) {
  return {practiceLists: state.practices.currentUserPracticeLists}
}

function mapDispatchToProps (dispatch) {
  return bindActionCreators({ fetchCurrentUserPracticeLists }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(PracticeListsPage)
