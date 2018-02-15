import React from "react"
import {
  Panel,
  Button,
  Grid, Row, Col
} from 'react-bootstrap';

import {
  CurrentActivity,
  Walking,
  WorkoutStats
} from '../widgets'

export default class Summary extends React.Component {

  static propTypes = {
    walkEvents: React.PropTypes.array.isRequired,
    startTime: React.PropTypes.number.isRequired,
    stopTime: React.PropTypes.number.isRequired
  }

  render() {
    return (
      <div>
        {this.props.startTime? <WorkoutStats isStopped startTime={this.props.startTime} stopTime={this.props.stopTime}/>
          : null}
        <Walking walkEvents={this.props.walkEvents}/>
      </div>);
  }
}