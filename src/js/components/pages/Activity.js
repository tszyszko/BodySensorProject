import React from "react"
import {
  Jumbotron,
  Button,
  Grid, Row, Col
} from 'react-bootstrap';

export default class Activity extends React.Component {

  static propTypes = {}

  render() {
    return (
      <div>
        <Grid>
          <Row className="show-grid">
            <Col md={6} mdPush={6}>
              <div id="still">Still</div>
            </Col>
            <Col md={6} mdPull={6}>
              <div id="walk">Still</div>
            </Col>
          </Row>

          <Row className="show-grid">
            <Col md={6} mdPush={6}>
              <div id="crouches">Still</div>
            </Col>
            <Col md={6} mdPull={6}>
              <div id="pushup">Still</div>
            </Col>
          </Row>
        </Grid>
      </div>);
  }
}