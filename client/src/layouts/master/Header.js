import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { Link } from 'react-router'
import { Navbar, NavItem, Nav, NavDropdown, MenuItem } from 'react-bootstrap'

import { logoutUser } from '../../authentication/modules/authentication.js'

class Header extends Component {
  handleLogout () {
    this.props.logoutUser()
  }

  renderAdminLinks () {
    if (this.props.authenticated) {
      if (this.props.currentUser.roles.includes('Admin')) {
        return [
          <NavDropdown eventKey={3} title='Administration' id='basic-nav-dropdown' key='accountDropdown'>
            <MenuItem eventKey={3.1}>
              <Link to='/admin/dashboard'>Dashboard</Link>
            </MenuItem>
            <MenuItem eventKey={3.1}>
              <Link to='/admin/users'>Users</Link>
            </MenuItem>
          </NavDropdown>
        ]
      }
    }
  }

  renderAuthLinks () {
    if (this.props.authenticated) {
      return [
        <NavDropdown eventKey={3} title={this.props.currentUser.username || ''} id='basic-nav-dropdown' key='accountDropdown'>
          <MenuItem eventKey={3.1}>
            <Link to={`users/${this.props.currentUser.username}`}>Profile</Link>
          </MenuItem>
          <MenuItem eventKey={3.1}>
            <Link to={`users/${this.props.currentUser.username}/portfolio`}>Portfolio</Link>
          </MenuItem>
          <MenuItem divider />
          <MenuItem eventKey={3.1}>
            <Link to={`flourishes/create`}>Upload Flourish</Link>
          </MenuItem>
          <MenuItem eventKey={3.1}>
            <Link to={`performances/create`}>Upload Performance</Link>
          </MenuItem>
          <MenuItem divider />
          <MenuItem eventKey={3.1}>
            <Link to={`user/practices/practice-lists/create`}>Create Practice List</Link>
          </MenuItem>
          <MenuItem eventKey={3.1}>
            <Link to={`user/practices/practice-lists`}>View Practice Lists</Link>
          </MenuItem>
          <MenuItem divider />
          <MenuItem eventKey={3.1}>
            <Link to={`tournaments/create`}>Create a Tournament</Link>
          </MenuItem>
          <MenuItem eventKey={3.1}>
            <Link to={`tournaments`}>View All Tournaments</Link>
          </MenuItem>
          <MenuItem divider />
          <MenuItem eventKey={3.1}>
            <Link to={`user/practices/start`}>Start Practice</Link>
          </MenuItem>
          <MenuItem divider />
          <MenuItem eventKey={3.1}>
            <Link to={`events/create`}>Create Event</Link>
          </MenuItem>
          <MenuItem divider />
          <MenuItem eventKey={3.4} onClick={this.handleLogout.bind(this)}>LOGOUT</MenuItem>
        </NavDropdown>
      ]
    } else {
      return [
        <NavItem eventKey={1} key='register'>
          <Link to='/register'>REGISTER</Link>
        </NavItem>,
        <NavItem eventKey={1} key='login'>
          <Link to='/login'>LOGIN</Link>
        </NavItem>
      ]
    }
  }

  render () {
    return (
      <Navbar inverse collapseOnSelect fluid>
        <Navbar.Header>
          <Navbar.Brand>
            <Link to='/'>Cardistry</Link>
          </Navbar.Brand>
          <Navbar.Toggle />
        </Navbar.Header>
        <Navbar.Collapse>
          <Nav>
            <NavItem eventKey={1}>
              <Link to='/flourishes/'>FLOURISHES</Link>
            </NavItem>
            <NavItem eventKey={1}>
              <Link to='/practices'>PRACTICE</Link>
            </NavItem>
            <NavItem eventKey={1}>
              <Link to='/versus'>VERSUS</Link>
            </NavItem>
            <NavItem eventKey={1}>
              <Link to='/tournaments'>TOURNAMENTS</Link>
            </NavItem>
            <NavItem eventKey={1}>
              <Link to='/events'>EVENTS</Link>
            </NavItem>
            <NavItem eventKey={1}>
              <Link to='/shop'>SHOP</Link>
            </NavItem>
            <NavItem eventKey={1}>
              <Link to='/login'>FORUM</Link>
            </NavItem>
            <NavItem eventKey={1}>
              <Link to='/market'>MARKET</Link>
            </NavItem>
            <NavItem eventKey={1}>
              <Link to='/about'>ABOUT</Link>
            </NavItem>
            <NavItem eventKey={1}>
              <Link to='/contacts'>CONTACTS</Link>
            </NavItem>
          </Nav>
          <Nav pullRight>
            {this.renderAuthLinks()}
            {this.renderAdminLinks()}
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    )
  }
}

function mapStateToProps (state) {
  return { authenticated: state.authentication.authenticated, currentUser: state.authentication.currentUser }
}

function mapDispatchToProps (dispatch) {
  return bindActionCreators({ logoutUser }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Header)
