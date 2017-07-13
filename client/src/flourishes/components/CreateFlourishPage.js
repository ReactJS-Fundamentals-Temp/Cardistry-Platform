import React, { Component } from 'react'
import CreateFlourishForm from '../containers/CreateFlourishForm'

export default class CreateFlourishPage extends Component {
  render () {
    return (
      <div>
        <h1>Upload Flourish</h1>
        <CreateFlourishForm />
      </div>
    )
  }
}
