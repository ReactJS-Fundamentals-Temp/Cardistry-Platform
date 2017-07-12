import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import { fetchUsers } from '../modules/administration'

import UserCard from './UserCard'

class Users extends Component {
  componentDidMount () {
    this.props.fetchUsers()
    console.log(this.props.users, 'users')
  }

  renderUsers () {
    console.log(this.props.users, 'render users')

    return this.props.users.map(user => {
      return (
        <div>
          <UserCard key={user._id} user={user} />
          <hr />
        </div>
      )
    })
  }

  render () {
    return (
      <div>
        <h1>Users:</h1>
        {this.renderUsers()}
      </div>
    )
  }
}

function mapStateToProps (state) {
  return { users: state.administration.users.all }
}

function mapDispatchToProps (dispatch) {
  return bindActionCreators({ fetchUsers }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Users)
