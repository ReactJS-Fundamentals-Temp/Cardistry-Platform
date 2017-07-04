import React, { Component } from 'react'
import { Jumbotron, Image } from 'react-bootstrap'

export default class Flourish extends Component {
  render () {
    const flourish = this.props.flourish
    console.log(flourish)

    return (
      <div>
        <Jumbotron>
          {/*<Image src={require(`../../../assets/images/flourishes/${flourish.title}/${flourish.thumbnail}`)} thumbnail />*/}
          <h1>{flourish.title}</h1>
          <p>{flourish.description}</p>
        </Jumbotron>
      </div>
    )
  }
}
