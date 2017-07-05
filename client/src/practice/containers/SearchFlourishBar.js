import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import { Form, FormGroup, FormControl, Col, ControlLabel, Button, Checkbox, Panel } from 'react-bootstrap'

class SearchFlourishBar extends Component {
  constructor (props) {
    super(props)

    this.state = { searchInput: '' }

    this.onSearchInputChange = this.onSearchInputChange.bind(this)
    this.onSubmit = this.onSubmit.bind(this)
  }

  onSearchInputChange (e) {
    this.setState({ searchInput: e.target.value })
  }

  onSubmit (e) {
    e.preventDefault()

    if (this.state.searchInput.trim() != '') {
      this.setState({ searchInput: '' })
    }
  }

  render () {
    return (
      <Panel>
        <form onSubmit={this.onSubmit}>
          <div className='form-group'>
            <input
              type='text'
              className='form-control'
              value={this.state.searchInput}
              onChange={this.onSearchInputChange}
              placeholder='Search for a flourish...' />
          </div>
          <div className='form-group'>
            <button className='btn btn-secondary'>Search</button>
          </div>
        </form>
      </Panel>
    )
  };
}

function mapDispatchToProps (dispatch) {
  return bindActionCreators({ }, dispatch)
}

export default connect(null, mapDispatchToProps)(SearchFlourishBar)
