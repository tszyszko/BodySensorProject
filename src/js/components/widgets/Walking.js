import React from "react"
import {
  Panel,
  Button,
  Grid, Row, Col
} from 'react-bootstrap';
import {
  Icon
} from 'react-fa';

export default class Walking extends React.Component {

  static propTypes = {
    walkEvents: React.PropTypes.array.isRequired,
  }


  getWalkCount() {
    return this.props.walkEvents.length;
  }

  render() {
    return (
      <div>
        <Panel bsStyle="primary">
          <Panel.Heading>
            <Panel.Title componentClass="h3">Walking</Panel.Title>
          </Panel.Heading>
          <Panel.Body>
            <h1>{this.getWalkCount()} Steps Recorded</h1>
          </Panel.Body>
        </Panel>
      </div>);
  }
}