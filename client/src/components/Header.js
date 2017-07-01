import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { Link } from 'react-router'
import { Navbar, NavItem, Nav } from 'react-bootstrap'

import { logoutUser } from '../authentication/modules/authentication.js'

class Header extends Component {
  handleLogout () {
    this.props.logoutUser()
  }

  renderLinks () {
    if (this.props.authenticated) {
      return [
        <NavItem eventKey={1} key='logout' onClick={this.handleLogout.bind(this)}>LOGOUT</NavItem>
      ]
    } else {
      return [
        <NavItem eventKey={1} key='register'><Link to='/register'>REGISTER</Link></NavItem>,
        <NavItem eventKey={1} key='login'><Link to='/login'>LOGIN</Link></NavItem>
      ]
    }
  }

  render () {
    return (
      <Navbar inverse collapseOnSelect>
        <Navbar.Header>
          <Navbar.Brand>
            <Link to='/'>React-Redux</Link>
          </Navbar.Brand>
          <Navbar.Toggle />
        </Navbar.Header>
        <Navbar.Collapse>
          <Nav>
            <NavItem eventKey={1}><Link to='/practice'>PRACTICE</Link></NavItem>
            <NavItem eventKey={1}><Link to='/versus'>VERSUS</Link></NavItem>
            <NavItem eventKey={1}><Link to='/about'>ABOUT</Link></NavItem>
            <NavItem eventKey={1}><Link to='/contacts'>CONTACTS</Link></NavItem>
          </Nav>
          <Nav pullRight>
            {this.renderLinks()}
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    )
  }
}

function mapStateToProps (state) {
  console.log(state, 'state')
  return { authenticated: state.authentication.authenticated }
}

function mapDispatchToProps (dispatch) {
  return bindActionCreators({ logoutUser }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Header)
