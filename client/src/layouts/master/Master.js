import React, { Component } from 'react'
import { Grid, Row, Col} from 'react-bootstrap'

import Header from './Header'
import Footer from './Footer'

export default class Master extends Component {
  render () {
    return (
      <div>
        <Header />
        <Grid>
          <Row className='show-grid'>
            <Col xs={12} md={12}>
              {this.props.routes}
            </Col>
          </Row>
        </Grid>
        <Footer />
      </div>

    )
  }
}
