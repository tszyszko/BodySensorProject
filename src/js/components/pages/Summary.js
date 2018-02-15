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
    walkCount: React.PropTypes.number.isRequired,
    stillCount: React.PropTypes.number.isRequired,
    crouchCount: React.PropTypes.number.isRequired,
    startTime: React.PropTypes.number.isRequired,
    stopTime: React.PropTypes.number.isRequired
  }

  render() {
    return (
      <div>
        {this.props.startTime? <WorkoutStats isStopped startTime={this.props.startTime} stopTime={this.props.stopTime}/>
          : null}
        <Walking walkCount={this.props.walkCount}/>
      </div>);
  }
}