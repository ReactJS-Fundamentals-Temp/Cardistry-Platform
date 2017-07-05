import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import { fetchUser } from '../modules/users'

import UserCard from '../components/UserCard'

class ProfilePage extends Component {
  componentDidMount () {
    const username = this.props.params.username
    this.props.fetchUser(username)
  }

  render () {
    return (
      <div>
        <h1>Profile</h1>
        <UserCard user={this.props.selectedUser} />
      </div>
    )
  }
}

function mapStateToProps (state) {
  console.log(state, 'STATE STATE')
  return { selectedUser: state.users.selectedUser }
}

function mapDispatchToProps (dispatch) {
  return bindActionCreators({ fetchUser }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(ProfilePage)
