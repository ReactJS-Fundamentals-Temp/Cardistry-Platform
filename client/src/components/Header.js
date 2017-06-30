import React, { Component } from 'react'
import { Link } from 'react-router'
import { Navbar, NavItem, Nav } from 'react-bootstrap'

export default class Header extends Component {
  renderLinks () {
    return [
      <NavItem eventKey={1} key='register'><Link to='/register'>REGISTER</Link></NavItem>,
      <NavItem eventKey={1} key='login'><Link to='/login'>LOGIN</Link></NavItem>
    ]
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
