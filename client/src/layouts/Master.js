import React, { Component } from 'react'

import Header from '../components/Header'
import Footer from '../components/Footer'

export default class Master extends Component {
  render () {
    return (
      <div>
        <Header />
        {this.props.routes}
        <Footer />
      </div>

    )
  }
}
