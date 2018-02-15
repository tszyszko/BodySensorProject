import React from "react"
import {
  Panel,
  Button,
  Grid, Row, Col
} from 'react-bootstrap';
import {
  Icon
} from 'react-fa';

export default class CurrentActivity extends React.Component {

  static propTypes = {
    currActivity: React.PropTypes.string.isRequired,
    handleStopActivity: React.PropTypes.func.isRequired
  }

  returnIcon(activity) {
    switch(activity) {
      case "walk":
        return (
          <Icon spin name="cog" size="lg"/>
        );
      case "crouch":
        return (
          <Icon name="street-view" size="lg"/>
      );
      case "still":
        return (
          <Icon name="street-view" size="lg"/>
        );
      default:
        return <Icon name="question" size="lg"/>;
    }
  }

  returnText(activity) {
    switch(activity) {
      case "walk":
        return (
          <h2>{this.returnIcon(this.props.currActivity)} Currently walking</h2>);
      case "crouch":
        return (
          <h2>{this.returnIcon(this.props.currActivity)} Currently squating</h2>);
      case "still":
        return (
          <h2>{this.returnIcon(this.props.currActivity)} Currently standing still</h2>);
      default:
        return (<h2>{this.returnIcon(this.props.currActivity)} Waiting for data</h2>);
    }
  }

  render() {
    return (
      <div>
        <Panel bsStyle="primary">
          <Panel.Heading>
            <Panel.Title componentClass="h3">Current Activity</Panel.Title>
          </Panel.Heading>
          <Panel.Body>
            <Row>
              <Col xs={8}>
                {this.returnText(this.props.currActivity)}
              </Col>
              <Col xs={4}>
                <Button bsStyle="danger" block bsSize="lg" onClick={this.props.handleStopActivity}>Stop workout!</Button>
              </Col>
            </Row>
          </Panel.Body>
        </Panel>
      </div>);
  }
}