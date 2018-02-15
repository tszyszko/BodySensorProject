import React from "react"
import {
  Panel,
  Button,
  Grid, Row, Col
} from 'react-bootstrap';

import {
  CurrentActivity
} from '../widgets'

export default class Activity extends React.Component {

  static propTypes = {
    walkCount: React.PropTypes.number.isRequired,
    stillCount: React.PropTypes.number.isRequired,
    crouchCount: React.PropTypes.number.isRequired,
    currentActivity: React.PropTypes.string.isRequired
  }

  render() {
    return (
      <div>
        <Grid>
          <Row className="show-grid">
            <CurrentActivity currActivity={this.props.currentActivity}/>
            <Col md={6} mdPush={6}>
              <Panel>
                <h1>Walk</h1>
                <h2> {this.props.walkCount} </h2>
              </Panel>
            </Col>
            <Col md={6} mdPull={6}>
              <Panel>
                <h1>Crouch</h1>
                <h2> {this.props.crouchCount} </h2>
              </Panel>
            </Col>
          </Row>

          <Row className="show-grid">
            <Col md={6} mdPush={6}>
              <Panel>
                <h1>Still</h1>
                <h2> {this.props.stillCount} </h2>
              </Panel>
            </Col>
            <Col md={6} mdPull={6}>
              <Panel>
                <h2> To Do </h2>
              </Panel>
            </Col>
          </Row>
        </Grid>
      </div>);
  }
}