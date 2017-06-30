import React, { Component } from 'react'
import { Link } from 'react-router'
import { Navbar, MenuItem, NavItem, Nav, NavDropdown } from 'react-bootstrap'

export default class Header extends Component {
  renderLinks () {
    return [
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
        </Navbar.Collapse>
      </Navbar>
    )
  }
}
