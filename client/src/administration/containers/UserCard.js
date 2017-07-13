import React, { Component } from 'react'
import { Jumbotron, Button } from 'react-bootstrap'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import { removeUser, makeUserAdmin, fetchUsers } from '../modules/administration'

class UserCard extends Component {
  removeUserClicked (event) {
    const userId = event.target.getAttribute('data-id')

    this.props.removeUser(userId)
    this.props.fetchUsers()
  }

  makeAdminUserClicked (event) {
    const userId = event.target.getAttribute('data-id')

    this.props.makeUserAdmin(userId)
  }

  render () {
    const user = this.props.user

    return (
      <div>
        <Jumbotron>
          <h1>{user.username}</h1>
          <Button data-id={user._id} onClick={this.removeUserClicked.bind(this)}>Delete</Button>
          {/*<Button data-id={user._id} onClick={this.makeAdminUserClicked.bind(this)}>Make Admin</Button>*/}
        </Jumbotron>
      </div>
    )
  }
}

function mapDispatchToProps (dispatch) {
  return bindActionCreators({ removeUser, makeUserAdmin, fetchUsers }, dispatch)
}

export default connect(null, mapDispatchToProps)(UserCard)
