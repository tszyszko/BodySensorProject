import React from "react"
import {
  Panel,
  Button,
  Grid, Row, Col
} from 'react-bootstrap';
import {
  Icon
} from 'react-fa';

export default class WorkoutStats extends React.Component {

  constructor() {
    super();
    this.state = {seconds: 0};
  }

  static propTypes = {
    isStopped: React.PropTypes.bool,
    startTime: React.PropTypes.number.isRequired,
    stopTime: React.PropTypes.number,
  }

  calcSecondsBetween(start, stop) {
    return (stop - start) / 1000;
  }

  updateScreenTimer(startTime) {
    this.setState({seconds: this.calcSecondsBetween(startTime, Date.now())});
  }

  componentDidMount() {
    if(this.props.isStopped) {
      this.setState({seconds: this.calcSecondsBetween(this.props.startTime, this.props.stopTime)});
    } else {
      this.interval = setInterval(() => {this.updateScreenTimer(this.props.startTime)}, 200);
    }

  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }


  displaySummary() {
    return <div>
      <h2> <Icon name="hourglass" size="lg"/> {this.state.seconds}</h2>
    </div>
  }

  displayRunning() {
    return <div>
      <h2><Icon spin name="hourglass" size="lg"/> {this.state.seconds}</h2>
    </div>
  }

  render() {
    return (
      <div>
        <Panel bsStyle="primary">
          <Panel.Heading>
            <Panel.Title componentClass="h3">Workout Statistics</Panel.Title>
          </Panel.Heading>
          <Panel.Body>
            {this.props.isStopped? this.displaySummary(): this.displayRunning()}
          </Panel.Body>
        </Panel>
      </div>);
  }
}