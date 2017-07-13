import React, { Component } from 'react'
import { Jumbotron, Button } from 'react-bootstrap'
import { Link } from 'react-router'

export default class Practice extends Component {
  render () {
    const practice = this.props.practice

    return (
      <div>
        <Jumbotron>
          <h2>Practice Type: {practice._type.name}</h2>
          <h2>Practice List: {practice._practice_list.title}</h2>
          <h2>Flourishes Count: {practice._practice_list.flourishes.length}</h2>
          <h2>Date: {practice.createdAt}</h2>
          <Link to={`/user/practices/${practice._id}`}>View Summary</Link>
        </Jumbotron>
      </div>
    )
  }
}
