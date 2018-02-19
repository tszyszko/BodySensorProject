import React from "react"
import {
  Panel,
  Button,
  Grid, Row, Col
} from 'react-bootstrap';
import {
  Icon
} from 'react-fa';

export default class Pressup extends React.Component {

  static propTypes = {
    pressupEvents: React.PropTypes.array.isRequired,
  }


  getPressupCount() {
    return this.props.pressupEvents.length;
  }

  render() {
    return (
      <div>
        <Panel bsStyle="primary">
          <Panel.Heading>
            <Panel.Title componentClass="h3">Pressups</Panel.Title>
          </Panel.Heading>
          <Panel.Body>
            <h1>{this.getPressupCount()} Pressups Recorded</h1>
          </Panel.Body>
        </Panel>
      </div>);
  }
}